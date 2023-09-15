import express from 'express';
import { signUp, login, getProfile } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/me', verifyToken, getProfile);  // use verifyToken middleware

export default router;
