import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router = Router();

router.get("/allusers", UsuarioController.readAllUsers);

router.get("/:id", UsuarioController.readById);

router.post("/", UsuarioController.createUser);

router.put("/:id", UsuarioController.updateUser);

router.delete("/:id", UsuarioController.deleteUser);

export default router;