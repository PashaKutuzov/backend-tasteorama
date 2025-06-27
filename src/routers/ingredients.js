import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getIngredientsController } from '../controllers/ingredients.js';
const router = Router();
router.get('/ingredients', ctrlWrapper(getIngredientsController));
export default router;
