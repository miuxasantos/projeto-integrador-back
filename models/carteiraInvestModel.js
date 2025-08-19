import { Sequelize, DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
    const CarteiraInvestModel = sequelize.define("carteiraInvest", {
        idCartInvest: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        
        data: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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
        tableName: 'carteirainvest', // Nome real da tabela no banco
        timestamps: false, // Desativa os timestamps automáticos
    }
);

    CarteiraInvestModel.associate = (models) => {
        CarteiraInvestModel.belongsTo(models.ContaModel, {
        foreignKey: "contas_idConta",
        as: "contas",
        onDelete: "CASCADE",
        });
    };

    return CarteiraInvestModel;
}