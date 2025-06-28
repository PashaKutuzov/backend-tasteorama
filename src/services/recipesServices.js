import { recipeModel } from '../models/recipesModel.js';
import { UsersCollection } from '../models/userModel.js';

export async function getAllRecipes({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
  filter = {},
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const recipeQuery = recipeModel.find();
  recipeQuery.where('userId').equals(userId);
  if (filter.type) {
    recipeQuery.where('contactType').equals(filter.type);
  }
  const [totalItems, data] = await Promise.all([
    recipeModel.countDocuments(recipeQuery.getQuery()),
    recipeQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
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

export function getRecipeById(recipeId, userId) {
  return recipeModel.findById({ _id: recipeId, userId });
}

export function createRecipes(payload) {
  return recipeModel.create(payload);
}
export function patchRecipes(recipeId, payload, userId) {
  return recipeModel.findOneAndUpdate({ _id: recipeId, userId }, payload, {
    new: true,
  });
}
export function deleteRecipesById(recipeId, userId) {
  return recipeModel.findOneAndDelete({ _id: recipeId, userId });
}

export async function addFavoriteRecipe(userId, recipeId) {
  const user = await UsersCollection.findById({ _id: userId });

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    { _id: userId },
    { favorites: [...user.favorites, recipeId] },
    { new: true }
  );
  return updatedUser;
}
