import createHttpError from 'http-errors';
import { getAllRecipes, getRecipeById } from '../services/recipesServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export async function getRecipesController(req, res) {
  //   const recipeId = req.recipe._id;
  const { page, perPage } = parsePaginationParams(req.query);

  const recipes = await getAllRecipes({
    page,
    perPage,
  });
  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
}

export async function getRecipesByIdController(req, res) {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(req.params.recipeId);

  if (recipe === null) {
    throw createHttpError(404, 'Not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${recipeId}!`,
    data: recipe,
  });
}
