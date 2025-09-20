import express from 'express';
import { getCurrentQr } from '../controllers/qr.controller';
import { requireAuth } from '../middlewares/auth.middleware';


const router = express.Router();


router.get('/current', requireAuth, getCurrentQr);


export default router;