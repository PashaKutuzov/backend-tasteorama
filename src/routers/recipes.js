import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getRecipesController,
  getAllRecipesController,
  createrecipesController,
  deleteRecipesByIdController,
  patchRecipesController,
  addFavoriteRecipeController,
  deleteFavoriteRecipeController,
  getFavoriteRecipeController,
  getRecipesByIdController,
} from '../controllers/recipesController.js';
import { isValidId } from '../middlewares/isValid.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateRecipeSchema } from '../validation/recipe.js';
import { authenticate } from '../middlewares/authenticate.js';
import { searchRecipesController } from '../controllers/searchRecipesController.js';
import { upload } from '../middlewares/multer.js';
import { uploadRecipeImg } from '../middlewares/multer.js';
import { parseIngredientsMiddleware } from '../utils/parseIngredientsMiddleware.js';
import { recipeCreateSchema } from '../validation/recipe.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/search', ctrlWrapper(searchRecipesController));

router.get(
  '/recipes/favorite',
  authenticate,
  ctrlWrapper(getFavoriteRecipeController)
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

router.get('/recipes', ctrlWrapper(getAllRecipesController));

router.get('/recipes/user', authenticate, ctrlWrapper(getRecipesController));
router.get('/recipes/:recipeId', ctrlWrapper(getRecipesByIdController));

router.post(
  '/recipes',
  authenticate,
  uploadRecipeImg,
  parseIngredientsMiddleware,
  validateBody(recipeCreateSchema),
  ctrlWrapper(createrecipesController)
);

router.patch(
  '/recipes/:recipeId',
  authenticate,
  upload.single('thumb'),
  validateBody(updateRecipeSchema),
  ctrlWrapper(patchRecipesController)
);

router.delete(
  '/recipes/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteRecipesByIdController)
);

export default router;
