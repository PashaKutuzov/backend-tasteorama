import createHttpError from 'http-errors';

export const requireUser = (req, res, next) => {
  if (!req.user) {
    return next(createHttpError(401, 'User is not authenticated'));
  }
  next();
};
