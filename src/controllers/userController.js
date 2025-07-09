import { UsersCollection } from '../models/userModel.js';
import createHttpError from 'http-errors';

export const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;

  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'User info retrieved successfully',
    data: user,
  });
};
