import { Sequelize, DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
    const UsuarioModel = sequelize.define("usuario", {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },

        tipo: {
            type: DataTypes.STRING(45),
            defaultValue: 'pessoal,'
        },

        creation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'creation',
        },

        atualização: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'att',
        }
    }, {
        tableName: 'usuarios', // Nome real da tabela no banco
        timestamps: false, // Desativa os timestamps automáticos
    }


);

    return UsuarioModel;
}
