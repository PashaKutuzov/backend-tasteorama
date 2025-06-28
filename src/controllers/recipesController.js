import createHttpError from 'http-errors';
import {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  deleteRecipesById,
  patchRecipes,
  addFavoriteRecipe,
} from '../services/recipesServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getRecipesController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const recipes = await getAllRecipes({
    page,
    perPage,
    userId,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
}

export async function getRecipesByIdController(req, res) {
  const { recipeId } = req.params;
  const userId = req.user._id;
  const recipe = await getRecipeById(recipeId, userId);

  if (recipe === null) {
    throw createHttpError(404, 'Not found');
  }
  if (recipe.userId.toString() !== userId.toString()) {
    throw new createHttpError.Forbidden('Access denied for recipes');
  }
  res.json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
}

export async function createrecipesController(req, res) {
  const recipe = await createRecipes({ ...req.body, userId: req.user._id });
  console.log('user:', req.user);
  console.log('User ID:', req.user._id);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a recipe!',
    data: recipe,
  });
}
export async function patchRecipesController(req, res) {
  const { recipeId } = req.params;
  const userId = req.user._id;
  const result = await patchRecipes(recipeId, req.body, userId);

  if (result === null) {
    throw createHttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a recipe!',
    data: result,
  });
}

export async function deleteRecipesByIdController(req, res) {
  const { recipeId } = req.params;
  const userId = req.user._id;
  const result = await deleteRecipesById(recipeId, userId);
  console.log(result);
  if (result === null) {
    throw createHttpError(404, 'Not found');
  }
  res.status(204).end();
}

export async function addFavoriteRecipeController(req, res, next) {
  try {
    const userId = req.user._id;

    const { recipeId } = req.body;

    const user = await addFavoriteRecipe(userId, recipeId);

    // const recipe = await addFavoriteRecipe(recipeId, userId);

    // if (!recipe) {
    //   throw createHttpError(404, 'Recipe not found or access denied');
    // }
    //

    // if (user.favorites.includes(recipeId)) {
    //   return res.status(200).json({ message: 'Recipe already in favorites' });
    // }
    // user.favorites.push(recipeId);
    // await user.save();

    res.status(201).json({ message: 'Recipe added to favorites', data: user });
  } catch (error) {
    next(error);
  }
}
