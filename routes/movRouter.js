import { Router } from 'express';
import MovController from '../controllers/movController.js';
import CheckOwner from '../middleware/ownerMiddleWare.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get("/:idConta", CheckOwner, AuthMiddleware, MovController.readAllMovs);

router.get("/:idConta/mov/:idMov", CheckOwner, AuthMiddleware, MovController.readById);

router.post("/:idConta", CheckOwner, AuthMiddleware, MovController.createMov);

router.put("/:idConta/mov/:idMov", CheckOwner, AuthMiddleware, MovController.updateMov);

router.delete("/:idConta/mov/:idMov", CheckOwner, AuthMiddleware, MovController.deleteMov);

export default router;