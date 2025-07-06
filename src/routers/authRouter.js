import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validation/authSchemas.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

router.post(
  '/refresh',
  authenticate,
  ctrlWrapper(refreshUserSessionController)
);

export default router;
