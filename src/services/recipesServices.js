import { recipeModel } from '../models/recipesModel.js';

export async function getAllRecipes({ page, perPage }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const recipeQuery = recipeModel.find();

  const [totalItems, data] = await Promise.all([
    recipeModel.countDocuments(recipeQuery.getQuery()),
    recipeQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
}

export function getRecipeById(id) {
  return recipeModel.findById(id);
}

export function createRecipes(payload) {
  return recipeModel.create(payload);
}
export function patchRecipes(recipeId, payload) {
  return recipeModel.findOneAndUpdate({ _id: recipeId }, payload, {
    new: true,
  });
}
export function deleteRecipesById(recipeId) {
  return recipeModel.findOneAndDelete({ _id: recipeId });
}
