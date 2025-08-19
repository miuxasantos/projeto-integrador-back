import dbConfig from '../config/dbConfig.js';
import { Sequelize, DataTypes } from 'sequelize';
import UsuarioModel from './usuarioModel.js';
import ContaModel from './contaModel.js';
import MovModel from './movModel.js';
import MetasModel from './metasModel.js';
import CarteiraInvestModel from './carteiraInvestModel.js';

const sequelize = new Sequelize(
    dbConfig.DATABASE,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log("connected!");
})
.catch(err => {
    console.log("Erro " + err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.UsuarioModel = UsuarioModel(sequelize, DataTypes); 
db.ContaModel = ContaModel(sequelize, DataTypes);
db.MovModel = MovModel(sequelize, DataTypes); 
db.MetasModel = MetasModel(sequelize, DataTypes);
db.CarteiraInvestModel = CarteiraInvestModel(sequelize, DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes res-ync done!');
})

// relacionamentos

// usuario e conta
db.UsuarioModel.hasMany(db.ContaModel, {
    foreignKey: 'usuarios_idUsuario',
    as: 'contas'
})

db.ContaModel.belongsTo(db.UsuarioModel, {
    foreignKey: 'usuarios_idUsuario',
    as: 'usuarios'
})

// conta e movimentacoes 

db.ContaModel.hasMany(db.MovModel, {
    foreignKey: 'contas_idConta',
    as: 'movimentacoes'
})

db.MovModel.belongsTo(db.ContaModel, {
    foreignKey: 'contas_idConta',
    as: 'contas'
})

// conta e metas

db.ContaModel.hasMany(db.MetasModel, {
    foreignKey: 'contas_idConta',
    as: 'metas'
})

db.MetasModel.belongsTo(db.ContaModel, {
    foreignKey: 'contas_idConta',
    as: 'contas'
})

// conta e carteira de invesimento 

db.ContaModel.hasMany(db.CarteiraInvestModel, {
    foreignKey: 'contas_idConta',
    as: 'carteirainvest'
})

db.CarteiraInvestModel.belongsTo(db.ContaModel, {
    foreignKey: 'contas_idConta',
    as: 'contas'
})


export default db;