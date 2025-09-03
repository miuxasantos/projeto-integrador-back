import db from '../models/index.js';

const UsuarioController = () =>{
    const Usuario = db.UsuarioModel;

    const createUser = async (req, res) => {
        try{
            let info = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                tipo: req.body.tipo
            }

            const usuario = await Usuario.create(info)
            res.status(201).send(usuario);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
            console.error(err);
        }
    }

    const readAllUsers = async (req, res) => {
        try{
            const userId = req.user.id;

            if(req.user.tipo !== "admin"){
                return res.status(403).json({error: "Acesso não concedido."});
            }

            let usuariosInfo = await Usuario.findAll({});
            res.status(200).send(usuariosInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const readById = async (req, res) => {
        try{
            let id = req.params.id;

            if(req.user.tipo !== "admin" && req.user.id !== parseInt(id)) {
                return res.status(403).json({error: "Acesso não concedido."});
            }

            let usuarioInfo = await Usuario.findOne({where: {idUsuario: id}});
            res.status(200).send(usuarioInfo);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const updateUser = async (req, res) => {
        try{
            let id = req.params.id;

            if(req.user.tipo !== "admin" && req.user.id !== parseInt(id)) {
                return res.status(403).json({error: "Acesso não concedido."});
            }

            const usuario = await Usuario.update(req.body, {where: {idUsuario: id}});
            res.status(200).send(usuario);
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    const deleteUser = async (req, res) => {
        try{
            let id = req.params.id;

            if(req.user.tipo !== "admin" && req.user.id !== parseInt(id)) {
                return res.status(403).json({error: "Acesso não concedido."});
            }
            
            const usuario = await Usuario.destroy({where: {idUsuario: id}});
            res.status(200).send('User deleted succesfully!');
        } catch(err){
            res.status(400).json(err.message);
            console.log(err);
        }
    }

    return {
        createUser,
        readAllUsers,
        readById,
        updateUser,
        deleteUser
    }
}

export default UsuarioController();