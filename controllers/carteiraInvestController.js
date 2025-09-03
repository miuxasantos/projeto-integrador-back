import db from '../models/index.js';
import ContaController from './contaController.js';

const CarteiraInvestController = () =>{
    const CarteiraInvest = db.CarteiraInvestModel;

    const createInvest = async (req, res) => {
        try{
            let info = {
                valor: req.body.valor,
                contas_idConta: req.body.contas_idConta,
            }

            const invesimento = await CarteiraInvest.create(info)
            res.status(201).send(invesimento);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readAllInvest = async (req, res) => {
        try{
            let investInfo = await CarteiraInvest.findAll({where: {contas_idConta: req.conta.idConta}});
            res.status(200).send(investInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readById = async (req, res) => {
        try{
            const { idCartInvest } = req.params;
            let investInfo = await CarteiraInvest.findOne({where: {idCartInvest, contas_idConta: req.conta.idConta}});

            if(!investInfo) {
                res.status(404).json({error: "Esse investimento não pôde ser encontrado."});
            }

            res.status(200).send(investInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const updateInvest = async (req, res) => {
        try{
            const { idCartInvest } = req.params;
            const investInfo = await CarteiraInvest.update(req.body, {where: {idCartInvest, conta_idConta: req.conta.idConta}});

            if(!investInfo) {
                res.status(404).json({error: "Esse investimento não pôde ser encontrado."});
            }

            res.status(200).send(invesimento);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const deleteInvest = async (req, res) => {
        try{
            const { idCartInvest } = req.params;
            const investInfo = await CarteiraInvest.findOne({where: {idCartInvest, conta_idConta: req.conta.params}});

            if(!investInfo) {
                res.status(404).json({error: "Esse investimento não pôde ser encontrado."});
            }

            await investInfo.destroy();
            res.status(200).send('Investment deleted succesfully!'); 
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    return {
        createInvest,
        readAllInvest,
        readById,
        updateInvest,
        deleteInvest
    }
}

export default CarteiraInvestController();