import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  if (isValidObjectId(req.params.recipeId) !== true) {
    return next(createHttpError.BadRequest('ID shoud be an object'));
  }
  next();
}
