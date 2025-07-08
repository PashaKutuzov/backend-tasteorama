import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    return next(createHttpError.BadRequest('ID should be a valid ObjectId'));
  }

  next();
}
