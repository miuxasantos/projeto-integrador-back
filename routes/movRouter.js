import { Router } from 'express';
import MovController from '../controllers/movController.js';

const router = Router();

router.get("/allmov", MovController.readAllMovs);

router.get("/:id", MovController.readById);

router.post("/", MovController.createMov);

router.put("/:id", MovController.updateMov);

router.delete("/:id", MovController.deleteMov);

export default router;