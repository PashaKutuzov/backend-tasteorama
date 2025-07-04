import { recipeModel as Recipe } from '../models/recipesModel.js';
import { Ingredients } from '../models/ingredients.js';

export const searchRecipesController = async (req, res, next) => {
  try {
    const {
      title = '',
      category,
      ingredient = '',
      page = '1',
      limit = '12',
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    if (title.trim()) {
      filter.title = { $regex: title.trim(), $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (ingredient.trim()) {
      const matchedIngredients = await Ingredients.find({
        name: { $regex: ingredient.trim(), $options: 'i' },
      });

      if (matchedIngredients.length === 0) {
        return res.json({
          status: 'success',
          code: 200,
          data: { result: [] },
          message: 'No ingredients matched',
        });
      }

      const ingredientIds = matchedIngredients.map((i) => i._id);

      filter['ingredients.id'] = { $in: ingredientIds };
    }

    const recipes = await Recipe.find(filter).skip(skip).limit(limitNum);

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: recipes,
      },
    });
  } catch (error) {
    next(error);
  }
};
