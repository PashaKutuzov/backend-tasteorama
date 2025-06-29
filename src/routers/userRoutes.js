import express from 'express';
import { getCurrentUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/me', authenticate, getCurrentUser);

export default router;
