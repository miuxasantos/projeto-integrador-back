import db from '../models/index.js';
import UsuarioController from './usuarioController.js';

const ContaController = () =>{
    const Conta = db.ContaModel;

    const createAccount = async (req, res) => {
        try{
            let info = {
                nome: req.body.nome,
                saldo: req.body.saldo,
                usuarios_idUsuario: req.user.id
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
            let contasInfo = req.user.tipo === "admin" ? await Conta.findAll({}) : await Conta.findAll({where: { usuarios_idUsuario: req.user.id }})
            res.status(200).send(contasInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readById = async (req, res) => {
        try{
            res.status(200).send(req.conta);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const updateAccount = async (req, res) => {
        try{
            await req.conta.update(req.body);
            res.status(200).json(req.conta);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const deleteAccount = async (req, res) => {
        try{
            await req.conta.destroy();
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