import { Sequelize, DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
    const MovModel = sequelize.define("movimentacao", {
        idMov: {
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

        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        
        tipoMovimentacao: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: "debito",
        },

        categoria: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: "outros",
        },

        tipo: {
            type: DataTypes.STRING(45),
            defaultValue: "fixo",
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
        tableName: 'movimentacoes', // Nome real da tabela no banco
        timestamps: false, // Desativa os timestamps automáticos
    }
);

    MovModel.associate = (models) => {
        MovModel.belongsTo(models.ContaModel, {
        foreignKey: "contas_idConta",
        as: "contas",
        onDelete: "CASCADE",
        });
    };

    return MovModel;
}