import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getRecipesController,
  getRecipesByIdController,
  getAllRecipesController,
  createrecipesController,
  deleteRecipesByIdController,
  patchRecipesController,
  addFavoriteRecipeController,
  deleteFavoriteRecipeController,
} from '../controllers/recipesController.js';
import { isValidId } from '../middlewares/isValid.js';
import { validateBody } from '../middlewares/validateBody.js';
import { recipeSchema, updateRecipeSchema } from '../validation/recipe.js';
import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';
const router = express.Router();
const jsonParser = express.json();

router.get('/recipes', ctrlWrapper(getAllRecipesController));

router.get('/recipes/user', authenticate, ctrlWrapper(getRecipesController));

router.get(
  '/recipes/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(getRecipesByIdController)
);

router.post(
  '/recipes',
  authenticate,

  upload.single('thumb'),
  validateBody(recipeSchema),
  ctrlWrapper(createrecipesController)
);
router.patch(
  '/recipes/:recipeId',
  authenticate,
  upload.single('thumb'),
  // jsonParser,
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

router.delete(
  '/recipes/favorite/:id',
  authenticate,
  isValidId,
  ctrlWrapper(deleteFavoriteRecipeController)
);

export default router;
