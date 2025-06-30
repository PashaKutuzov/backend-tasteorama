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

// Роутер для рецептів

// // Публічний маршрут — отримати всі рецепти з фільтрацією, пошуком, пагінацією
// router.get('/recipes', ctrlWrapper(getAllRecipesController));

// // Приватний — власні рецепти користувача
// router.get('/recipes/own', authenticate, ctrlWrapper(getRecipesController));

// // Публічний — отримати рецепт за id
// router.get(
//   '/recipes/:recipeId',
//   isValidId,
//   ctrlWrapper(getRecipesByIdController)
// );

// // Приватний — створити рецепт
// router.post(
//   '/recipes',
//   authenticate,
//   jsonParser,
//   upload.single('thumb'),
//   validateBody(recipeSchema),
//   ctrlWrapper(createrecipesController)
// );

// // Приватний — оновити рецепт (тільки власник)
// router.patch(
//   '/recipes/:recipeId',
//   authenticate,
//   isValidId,
//   jsonParser,
//   validateBody(updateRecipeSchema),
//   ctrlWrapper(patchRecipesController)
// );

// // Приватний — видалити рецепт (тільки власник)
// router.delete(
//   '/recipes/:recipeId',
//   authenticate,
//   isValidId,
//   ctrlWrapper(deleteRecipesByIdController)
// );

// // Приватний — додати рецепт у улюблені
// router.post(
//   '/favorites/:recipeId',
//   authenticate,
//   isValidId,
//   ctrlWrapper(addFavoriteRecipeController)
// );

// // Приватний — видалити рецепт з улюблених
// router.delete(
//   '/favorites/:recipeId',
//   authenticate,
//   isValidId,
//   ctrlWrapper(deleteFavoriteRecipeController)
// );

export default router;
