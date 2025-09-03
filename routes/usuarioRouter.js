import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import AuthMiddleware from '../middleware/authMiddleware.js'; 

const router = Router();

router.get("/allusers", AuthMiddleware, UsuarioController.readAllUsers);

router.get("/:id", AuthMiddleware, UsuarioController.readById);

router.post("/", UsuarioController.createUser);

router.put("/:id", AuthMiddleware, UsuarioController.updateUser);

router.delete("/:id", AuthMiddleware, UsuarioController.deleteUser);

export default router;