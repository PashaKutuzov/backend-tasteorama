import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(createHttpError.BadRequest('ID should be a valid ObjectId'));
  }

  next();
}
