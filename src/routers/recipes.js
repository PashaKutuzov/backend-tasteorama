import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getRecipesController,
  getRecipesByIdController,
  createrecipesController,
  deleteRecipesByIdController,
  patchRecipesController,
} from '../controllers/recipesController.js';
import { isValidId } from '../middlewares/isValid.js';
import { validateBody } from '../middlewares/validateBody.js';
import { recipeSchema, updateRecipeSchema } from '../validation/recipe.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();
const jsonParser = express.json();
router.get('/recipes', ctrlWrapper(getRecipesController));

router.get(
  '/recipes/:recipeId',
  isValidId,
  ctrlWrapper(getRecipesByIdController)
);

router.post(
  '/recipes',
  jsonParser,
  upload.single('thumb'),
  validateBody(recipeSchema),
  ctrlWrapper(createrecipesController)
);
router.patch(
  '/recipes/:recipeId',
  jsonParser,
  validateBody(updateRecipeSchema),
  ctrlWrapper(patchRecipesController)
);
router.delete(
  '/recipes/:recipeId',
  isValidId,
  ctrlWrapper(deleteRecipesByIdController)
);

export default router;
