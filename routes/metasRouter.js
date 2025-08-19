import { Router } from 'express';
import MetasController from '../controllers/metasController.js';

const router = Router();

router.get("/allgoals", MetasController.readAllGoals);

router.get("/:id", MetasController.readById);

router.post("/", MetasController.createGoal);

router.put("/:id", MetasController.updateGoal);

router.delete("/:id", MetasController.deleteGoal);

export default router;