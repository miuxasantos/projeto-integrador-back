import { Router } from 'express';
import MetasController from '../controllers/metasController.js';
import CheckOwner from '../middleware/ownerMiddleWare.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get("/:idConta", CheckOwner, AuthMiddleware, MetasController.readAllGoals);

router.get("/:idConta/metas/:idMeta", CheckOwner, AuthMiddleware, MetasController.readById);

router.post("/:idConta", CheckOwner, AuthMiddleware, MetasController.createGoal);

router.put("/:idConta/metas/:idMeta", CheckOwner, AuthMiddleware, MetasController.updateGoal);

router.delete("/:idConta/metas/:idMeta", CheckOwner, AuthMiddleware, MetasController.deleteGoal);

export default router;