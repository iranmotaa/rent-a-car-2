import Usuario from "../data-models/Usuario.js";
import { UniqueConstraintError } from 'sequelize';
import CryptoJS from "crypto-js";
import JsonWebToken  from "jsonwebtoken";

const SECRET = "ChavesFoiParaAcapuco"

export default class UsuarioModel{
    async add(dados){    
        try{ 
            if(!dados.email){
                throw "E-mail é obrigatório";
            }

            if(!dados.nome){
                throw "Nome é obrigatório";
            }

            if(!dados.senha){
                throw "Senha é obrigatório";
            }

            dados.senha = await CryptoJS.AES.encrypt(dados.senha, SECRET).toString();
            const usuario = await Usuario.create(dados);
        }catch(e){
            if(e instanceof UniqueConstraintError){
                throw "E-mail já cadastrado";
            }
            throw e;
        }
    }

    async buscarUsuarioPorEmail(email){
        const usuario = await Usuario.findOne(
            {
                where:{
                    email: email
                }
            }
        );

        if(!usuario){
            throw "Usuário não encontrado";
        }

        return usuario;
    }

    async _gerarToken(usuario){
        const payload = {
            usuario: {
                id: usuario.id,
                papel: usuario.papel
            }
        };

        const options = {};

        const token = await JsonWebToken.sign(payload, SECRET, options);
        
        return token;
    }

    async login(email, senha){
        if(!email){
            throw "E-mail é obrigatório";
        }

        if(!senha){
            throw "Senha é obrigatório";
        }
        
        const usuario = await this.buscarUsuarioPorEmail(email);

        usuario.senha = await CryptoJS.AES.decrypt(usuario.senha, SECRET).toString(CryptoJS.enc.Utf8);

        if(senha != usuario.senha){
            throw "Senha inválida";
        }
        
        const token = await this._gerarToken(usuario);

        const credenciais = {
            token: token,
            usuario: {
                id: usuario.id,
                name: usuario.nome,
                email: usuario.email,
                papel: usuario.papel
            }
        };
    
        return credenciais;
    }

    async listarTodos(){
        return await Usuario.findAll();
    }
}