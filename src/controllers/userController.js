import { UsersCollection } from '../models/userModel.js';

export const getCurrentUser = async (req, res) => {
  const user = await UsersCollection.findById(req.user._id);

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
