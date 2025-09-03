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
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        tipo: {
            type: DataTypes.STRING(45),
            defaultValue: 'pessoal',
        },

        creation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'creation',
        },

        atualizacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'att',
        }
    }, {
        tableName: 'usuarios', // Nome real da tabela no banco
        timestamps: true, // Desativa os timestamps automáticos
        createdAt: "creation",
        updatedAt: "att",
    }
);

    return UsuarioModel;
}
