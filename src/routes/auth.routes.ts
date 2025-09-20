import express from 'express';
import { body } from 'express-validator';
import { register, login, forgotPassword, me } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';


const router = express.Router();


router.post('/register', [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 }).trim()], register);
router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').isString().trim()], login);
router.post('/forgot-password', [body('email').isEmail()], forgotPassword);
router.get('/me', requireAuth, me);


export default router;