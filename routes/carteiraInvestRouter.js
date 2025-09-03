import { Router } from 'express';
import CarteiraInvestController from '../controllers/carteiraInvestController.js';
import CheckOwner from '../middleware/ownerMiddleWare.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get("/:idConta", CheckOwner, AuthMiddleware, CarteiraInvestController.readAllInvest);

router.get("/:idConta/invest/:idCartInvest", CheckOwner, AuthMiddleware, CarteiraInvestController.readById);

router.post("/:idConta", CheckOwner, AuthMiddleware, CarteiraInvestController.createInvest);

router.put("/:idConta/invest/:idCartInvest", CheckOwner, AuthMiddleware, CarteiraInvestController.updateInvest);

router.delete("/:idConta/invest/:idCartInvest", CheckOwner, AuthMiddleware, CarteiraInvestController.deleteInvest);

export default router;