import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router;

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/verify', authController.verifyToken);

export default authRouter;