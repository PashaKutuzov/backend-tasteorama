import mongoose from 'mongoose';
import { recipeModel } from '../models/recipesModel.js';
import { UsersCollection } from '../models/userModel.js';
import createHttpError from 'http-errors';

export async function getRecipes({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const recipeQuery = recipeModel.find();

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

export async function getMyRecipes(user) {
  const myRecipesIds = user.myRecipes
    .filter((id) => mongoose.Types.ObjectId.isValid(id))
    .map((id) => new mongoose.Types.ObjectId(id));

  const recipes = await recipeModel.find({
    _id: { $in: myRecipesIds },
  });
  return recipes;
}

export function getRecipeById(recipeId) {
  return recipeModel.findById({ _id: recipeId });
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

export async function getFavoriteRecipes(userId) {
  const user = await UsersCollection.findById(userId);

  if (!user || !user.favorites.length) {
    return [];
  }

  const favoriteIds = user.favorites
    .filter((id) => mongoose.Types.ObjectId.isValid(id))
    .map((id) => new mongoose.Types.ObjectId(id));

  const recipes = await recipeModel.find({
    _id: { $in: favoriteIds },
  });

  return recipes;
}

export async function addFavoriteRecipe(userId, recipeId) {
  const user = await UsersCollection.findById(userId);
  if (!user) throw createHttpError(404, 'User not found');

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    throw createHttpError(400, 'Invalid recipe ID');
  }

  const isAlreadyFavorite = user.favorites.some(
    (id) => id.toString() === recipeId.toString()
  );
  if (isAlreadyFavorite) {
    return user;
  }

  user.favorites.push(mongoose.Types.ObjectId.createFromHexString(recipeId));
  return await user.save();
}

export async function deleteFavoriteRecipe(userId, recipeId) {
  const user = await UsersCollection.findById(userId);
  const updatedFavorites = user.favorites.filter(
    (favId) => favId.toString() !== recipeId
  );

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { favorites: updatedFavorites },
    { new: true }
  );

  return updatedUser;
}
