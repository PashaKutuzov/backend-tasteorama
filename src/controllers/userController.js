import { UsersCollection } from '../models/userModel.js';
import '../models/recipesModel.js';

export const getCurrentUser = async (req, res, next) => {
  const user = await UsersCollection.findById(req.user._id)
    .populate('favorites')
    .populate('myRecipes');

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    favorites: user.favorites,
    myRecipes: user.myRecipes,
  });
};
