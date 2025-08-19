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
            let movsInfo = await Movimentacao.findAll({})
            res.status(200).send(movsInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readById = async (req, res) => {
        try{
            let id = req.params.id;
            let movInfo = await Movimentacao.findOne({where: {idMov: id}});
            res.status(200).send(movInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const updateMov = async (req, res) => {
        try{
            let id = req.params.id;
            const mov = await Movimentacao.update(req.body, {where: {idMov: id}});
            res.status(200).send(mov);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const deleteMov = async (req, res) => {
        try{
            let id = req.params.id;
            const mov = await Movimentacao.destroy({where: {idMov: id}});
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