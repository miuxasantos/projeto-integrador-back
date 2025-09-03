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
            let metasInfo = await Meta.findAll({where: {contas_idConta: req.id.idConta}});
            res.status(200).send(metasInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readById = async (req, res) => {
        try{
            const { idMeta } = req.params;
            let metaInfo = await Meta.findOne({where: {idMeta, contas_idConta: req.conta.idConta}});

            if(!metaInfo) {
                res.status(404).json({error: "Essa meta não pôde ser encontrada."});
            }

            res.status(200).send(metaInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const updateGoal = async (req, res) => {
        try{
            const { idMeta } = req.params;
            const meta = await Meta.update(req.body, {where: {idMeta, contas_idConta: req.conta.idConta}});

            if(!meta) {
                res.status(404).json({error: "Essa meta não pôde ser encontrada."});
            }

            res.status(200).send(meta);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const deleteGoal = async (req, res) => {
        try{
            const { idMeta } = req.params;
            const meta = await Meta.findOne({where: {idMeta, contas_idConta: req.conta.idConta}});

            if(!meta) {
                res.status(404).json({error: "Essa meta não pôde ser encontrada."});
            }

            await meta.destroy();
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