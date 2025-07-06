export function parseIngredientsMiddleware(req, res, next) {
  if (typeof req.body.ingredients === 'string') {
    try {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON in ingredients' });
    }
  }
  next();
}
