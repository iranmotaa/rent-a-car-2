import EnumPapelUsuario from "../enums/EnumPapelUsuario.js";
import UsuarioModel from "../models/UsuarioModel.js";

export default class UsuarioController {
  async renderizarSignupForm(req, res) {
    res.render("signupForm");
  }

  async renderizarLoginForm(req, res) {
    res.render("loginForm");
  }

  async addNovoUsuario(req, res) {
    const dados = req.body;
    const model = await new UsuarioModel();
    try {
      await model.add(dados);
      res.render("loginForm", { msg: "Usuário cadastrado com sucesso" });
    } catch (e) {
      res.render("signupForm", { e });
    }
  }

  async login(req, res) {
    const data = req.body;
    const model = new UsuarioModel();
    try {
      const credenciais = await model.login(data.email, data.senha);
      req.session.credenciais = credenciais;
      res.render("paginaPrincipal", { credenciais: credenciais });
    } catch (e) {
      res.render("loginForm", { e });
    }
  }

  async renderizarListagemDeUsuarios(req, res) {
    const credenciais = req.session.credenciais;
    try {
      if (!credenciais) {
        throw "Autenticação necessária";
      }
      console.log(credenciais)
      if(credenciais.usuario.papel == EnumPapelUsuario.ADMINISTRADOR){
          const model = new UsuarioModel();
          const usuarios = await model.listarTodos();
          res.render("listagemDeUsuarios", { usuarios });
      }
      if(credenciais.usuario.papel == EnumPapelUsuario.CLIENTE){
        throw "Você não tem permissão para acessar a lista de usuários"
      }
    } catch (e) {
      res.render("loginForm", { e });
    }
  }

  async renderizarPaginaPrincipal(req, res) {
    res.render("paginaPrincipal");
  }

  async renderizarVeiculosBasicos(req, res){
    res.render("veiculosBasicos");
  }
  async renderizarVeiculosMedio(req, res){
    res.render("veiculosMedio");
  }
  async renderizarVeiculosLuxo(req, res){
    res.render("veiculosLuxo");
  }
  async renderizarVeiculosSuperLuxo(req, res){
    res.render("veiculosSuperLuxo");
  }
}
