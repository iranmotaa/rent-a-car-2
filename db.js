import { Sequelize } from "sequelize";

const banco = 'rentdb';
const usuario = 'root';
const senha = '';
const opcoes = {dialect: "mysql", host: "localhost", port: 3306};

const sequelize = new Sequelize("", usuario, senha, opcoes);

const data = await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${banco};`);
 
console.log(data);

export default new Sequelize(banco, usuario, senha, opcoes);

