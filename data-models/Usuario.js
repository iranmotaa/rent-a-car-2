import {DataTypes, Model } from 'sequelize';
import db from '../db.js';
import EnumPapelUsuario from '../enums/EnumPapelUsuario.js';

class Usuario extends Model{}

Usuario.init(
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        papel:{
            type: DataTypes.STRING,
            defaultValue: EnumPapelUsuario.CLIENTE
        },
        email:{
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {sequelize: db}
)

export default Usuario;
