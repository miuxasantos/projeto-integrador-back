import db from '../models/index.js';
import ContaController from './contaController.js';

const MetasController = () =>{
    const Meta = db.MetasModel;

    const createGoal = async (req, res) => {
        try{
            let info = {
                nome: req.body.nome,
                objetivo: req.body.objetivo,
                quantia: req.body.quantia,
                progresso: req.body.progresso,
                contas_idConta: req.body.contas_idConta,
            }

            const meta = await Meta.create(info)
            res.status(201).send(meta);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readAllGoals = async (req, res) => {
        try{
            let metasInfo = await Meta.findAll({})
            res.status(200).send(metasInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readById = async (req, res) => {
        try{
            let id = req.params.id;
            let metaInfo = await Meta.findOne({where: {idMeta: id}});
            res.status(200).send(metaInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const updateGoal = async (req, res) => {
        try{
            let id = req.params.id;
            const meta = await Meta.update(req.body, {where: {idMeta: id}});
            res.status(200).send(meta);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const deleteGoal = async (req, res) => {
        try{
            let id = req.params.id;
            const meta = await Meta.destroy({where: {idMeta: id}});
            res.status(200).send('Goal deleted succesfully!'); 
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    return {
        createGoal,
        readAllGoals,
        readById,
        updateGoal,
        deleteGoal
    }
}

export default MetasController();