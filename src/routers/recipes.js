import express from 'express';
import ctrlWrapper from '../validation/ctrlWrapper.js';
import {
  getRecipesController,
  getRecipesByIdController,
} from '../controllers/recipesController.js';
import { isValidId } from '../middlewares/isValid.js';

const router = express.Router();

router.get('/recipes', ctrlWrapper(getRecipesController));

router.get(
  '/recipes/:recipeId',
  isValidId,
  ctrlWrapper(getRecipesByIdController)
);

export default router;
