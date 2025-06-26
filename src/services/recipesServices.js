import { recipeModel } from '../models/recipesModel.js';

export async function getAllRecipes({ page, perPage }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = recipeModel.find();

  const [totalItems, data] = await Promise.all([
    recipeModel.countDocuments(contactQuery.getQuery()),
    contactQuery.skip(skip).limit(perPage),
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
