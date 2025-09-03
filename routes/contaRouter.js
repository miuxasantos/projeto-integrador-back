import { Router } from 'express';
import ContaController from '../controllers/contaController.js';
import AuthMiddleware from '../middleware/authMiddleware.js';
import CheckOwner from '../middleware/ownerMiddleWare.js';

const router = Router();

router.get("/", AuthMiddleware, ContaController.readAllAccounts);

router.get("/:idConta", AuthMiddleware, CheckOwner, ContaController.readById);

router.post("/", AuthMiddleware, ContaController.createAccount);

router.put("/:idConta", AuthMiddleware, CheckOwner, ContaController.updateAccount);

router.delete("/:idConta", AuthMiddleware, CheckOwner, ContaController.deleteAccount);

export default router;