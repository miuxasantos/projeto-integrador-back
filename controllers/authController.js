import usuarioController from "./usuarioController";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "fav";

const SignUp = async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        const usuarios = await usuarioController.readAllUsers();
        const usuarioExiste = usuarios.find(user => user.email == email);

        if(usuarioExiste){
            return res.status(400).json({error: "Já existe um usuário com esse email!"});
        }

        const mockRes = {
            status: () => mockRes,
            send: (data) => data,
        }

        const novoUsuario = await usuarioController.createUser({
            body: { nome, email, senha, tipo }
        }, mockRes, true);

        const token = jwt.sign(
            { id: novoUsuario.idUsuario, email: novoUsuario.email},
            JW_SECRET,
            {expiresIn: '24h'}
        );

        res.status(201).json({
            message: "Usuário criado com sucesso.",
            token,
            usuario: {
                id: novoUsuario.idUsuario,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                senha: novoUsuario.senha,
                tipo: novoUsuario.tipo
            }

        });

    } catch (error) {
        res.status(500).json({error: "Erro ao criar um usuário."});
    }
};

const SignIn = async (req, res) => {
    try{
        const {email, senha} = req.body;

        const usuarios = await usuarioController.readAllUsers();
        const usuario = usuario.find(u => u.email === email);

        if(!usuario) {
            return res.status(401).json({ error: "Credencial inválida." });
        }

        if(usuario.senha !== senha){
            return res.status(401).json({ error: "Senha inválida." });
        }

        const token = jwt.sign(
            { id: usuario.idUsuario, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

         res.json({
            message: 'Login realizado com sucesso',
            token,
            usuario: {
                id: usuario.idUsuario,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer', '');

    if(!token){
        return res.status(401).json({ error: 'Erro ao verificar token'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.idUsuario = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Erro ao decodificar. '});
    }
};