import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if(!token) {
        return res.status(400).json({error: "Token não fornecido"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(403).json({error: "Token inválido ou expirado."});
    }

};

export default AuthMiddleware;