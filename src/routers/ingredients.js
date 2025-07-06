import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getIngredientsController,
  createIngredientController,
} from '../controllers/ingredients.js';
import { upload } from '../middlewares/multer.js';
const router = Router();
router.get('/ingredients', ctrlWrapper(getIngredientsController));
router.post(
  '/ingredients',
  upload.single('img'),
  ctrlWrapper(createIngredientController)
);
export default router;
