import db from '../models/index.js';

const Conta = db.ContaModel;

const CheckOwner = async (req, res, next) => {
    try {
        const { idConta } = req.params;

        const conta = await Conta.findByPk(idConta);

        if(!conta){
            return res.status(404).json({error: "Conta não encontrada."});
        }

        if(req.user.tipo !== "admin" && conta.usuarios_idUsuario !== req.user.id){
            return res.status(403).json({error: "Acesso negado, essa conta pertence à outro usuário."});
        }

        req.conta = conta;

        next();
    } catch (err) {
        res.status(500).json({error: "Erro interno."});
    }
};

export default CheckOwner;