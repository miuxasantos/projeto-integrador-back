import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  const ContaModel = sequelize.define("conta",
    {
      idConta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },

      nome: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      saldo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },

      usuarios_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          // Definindo explicitamente a FK
          model: "usuarios", // Nome da tabela no banco
          key: "idUsuario",
        },
      }
    }, {
        tableName: 'contas',
        timestamps: false,
});

  ContaModel.associate = (models) => {
    ContaModel.belongsTo(models.UsuarioModel, {
      foreignKey: "usuario_idUsuario",
      as: "usuario",
      onDelete: "CASCADE",
    });
  };

  return ContaModel;
};
