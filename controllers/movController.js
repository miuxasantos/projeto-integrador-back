import db from '../models/index.js';
import ContaController from './contaController.js';

const MovController = () =>{
    const Movimentacao = db.MovModel;

    const createMov = async (req, res) => {
        try{
            let info = {
                nome: req.body.nome,
                valor: req.body.valor,
                tipoMovimentacao: req.body.tipoMov,
                tipo: req.body.tipo,
                categoria: req.body.categoria,
                contas_idConta: req.body.contas_idConta,
            }

            const movimentacao = await Movimentacao.create(info)
            res.status(201).send(movimentacao);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readAllMovs = async (req, res) => {
        try{
            let movsInfo = await Movimentacao.findAll({ where: { contas_idConta: req.conta.idConta }})
            res.status(200).send(movsInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readById = async (req, res) => {
        try{
            const { idMov } = req.params;
            const movInfo = await Movimentacao.findOne({where: {idMov, contas_idConta: req.conta.idConta}});

            if(!movInfo) {
                return res.status(404).json({error: "Movimentação não encontrada."});
            }

            res.status(200).send(movInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const updateMov = async (req, res) => {
        try{
            const { idMov } = req.params;
            const mov = await Movimentacao.update(req.body, {where: {idMov, contas_idConta: req.conta.idConta}});

            if(!mov){
                res.status(404).json({error: "Movimentação não encontrada."});
            }

            res.status(200).send(mov);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const deleteMov = async (req, res) => {
        try{
            const { idMov } = req.params;
            const mov = await Movimentacao.findOne({where: {idMov, contas_idConta: req.conta.idConta}});

            if(!mov) {
                return res.status(404).json({error: "Movimentação não encontrada."});
            }

            await mov.destroy();
            res.status(200).send('Movimentation deleted succesfully!'); 
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    return {
        createMov,
        readAllMovs,
        readById,
        updateMov,
        deleteMov
    }
}

export default MovController();