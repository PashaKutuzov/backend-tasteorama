export function parseIngredientsMiddleware(req, res, next) {
  if (typeof req.body.ingredient === 'string') {
    try {
      req.body.ingredient = JSON.parse(req.body.ingredient);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON in ingredients' });
    }
  }
  next();
}
