import { Router } from 'express';
import CarteiraInvestController from '../controllers/carteiraInvestController.js';

const router = Router();

router.get("/allinvest", CarteiraInvestController.readAllInvest);

router.get("/:id", CarteiraInvestController.readById);

router.post("/", CarteiraInvestController.createInvest);

router.put("/:id", CarteiraInvestController.updateInvest);

router.delete("/:id", CarteiraInvestController.deleteInvest);

export default router;