import { UsersCollection } from '../models/userModel.js';
import { recipeModel } from '../models/recipesModel.js';

export const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;

  const createdRecipeIds = await recipeModel.find({ owner: userId }, '_id');
  const recipeIds = createdRecipeIds.map((r) => r._id);

  if (recipeIds.length > 0) {
    await UsersCollection.findByIdAndUpdate(userId, {
      $addToSet: { myRecipes: { $each: recipeIds } },
    });
  }

  const user = await UsersCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'User info retrieved successfully',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites,
      myRecipes: user.myRecipes,
    },
  });
};
