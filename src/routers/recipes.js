import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getRecipesController,
  getRecipesByIdController,
  createrecipesController,
  deleteRecipesByIdController,
  patchRecipesController,
  addFavoriteRecipeController,
} from '../controllers/recipesController.js';
import { isValidId } from '../middlewares/isValid.js';
import { validateBody } from '../middlewares/validateBody.js';
import { recipeSchema, updateRecipeSchema } from '../validation/recipe.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();
router.get('/recipes', authenticate, ctrlWrapper(getRecipesController));

router.get(
  '/recipes/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(getRecipesByIdController)
);

router.post(
  '/recipes',
  authenticate,
  jsonParser,
  validateBody(recipeSchema),
  ctrlWrapper(createrecipesController)
);
router.patch(
  '/recipes/:recipeId',
  authenticate,
  jsonParser,
  validateBody(updateRecipeSchema),
  ctrlWrapper(patchRecipesController)
);
router.delete(
  '/recipes/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteRecipesByIdController)
);

router.post(
  '/recipes/favorite',
  authenticate,
  jsonParser,
  ctrlWrapper(addFavoriteRecipeController)
);

export default router;
