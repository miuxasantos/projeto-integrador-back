import { Sequelize, DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
    const MetasModel = sequelize.define("metas", {
        idMeta: {
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

        objetivo: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false,
        },

        quantia: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        
        progresso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        contas_idConta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            // Definindo explicitamente a FK
                model: "contas", // Nome da tabela no banco
                key: "idConta",
            },
        }
    }, {
        tableName: 'metas', // Nome real da tabela no banco
        timestamps: false, // Desativa os timestamps automáticos
    }
);

    MetasModel.associate = (models) => {
        MetasModel.belongsTo(models.ContaModel, {
        foreignKey: "contas_idConta",
        as: "contas",
        onDelete: "CASCADE",
        });
    };

    return MetasModel;
}