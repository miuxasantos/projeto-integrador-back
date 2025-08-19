import { Router } from 'express';
import ContaController from '../controllers/contaController.js';

const router = Router();

router.get("/allacc", ContaController.readAllAccounts);

router.get("/:id", ContaController.readById);

router.post("/", ContaController.createAccount);

router.put("/:id", ContaController.updateAccount);

router.delete("/:id", ContaController.deleteAccount);

export default router;