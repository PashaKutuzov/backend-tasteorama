import express from 'express';
import { getCurrentUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/me', authenticate, ctrlWrapper(getCurrentUser));
export default router;

//
