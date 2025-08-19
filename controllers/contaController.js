import db from '../models/index.js';
import UsuarioController from './usuarioController.js';

const ContaController = () =>{
    const Conta = db.ContaModel;

    const createAccount = async (req, res) => {
        try{
            let info = {
                nome: req.body.nome,
                saldo: req.body.saldo,
                usuarios_idUsuario: req.body.usuarios_idUsuario,
            }

            const conta = await Conta.create(info)
            res.status(201).send(conta);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readAllAccounts = async (req, res) => {
        try{
            let contasInfo = await Conta.findAll({})
            res.status(200).send(contasInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readById = async (req, res) => {
        try{
            let id = req.params.id;
            let contaInfo = await Conta.findOne({where: {idConta: id}});
            res.status(200).send(contaInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const updateAccount = async (req, res) => {
        try{
            let id = req.params.id;
            const conta = await Conta.update(req.body, {where: {idConta: id}});
            res.status(200).send(conta);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const deleteAccount = async (req, res) => {
        try{
            let id = req.params.id;
            const conta = await Conta.destroy({where: {idConta: id}});
            res.status(200).send('Account deleted succesfully!');
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    return {
        createAccount,
        readAllAccounts,
        readById,
        updateAccount,
        deleteAccount
    }
}

export default ContaController();