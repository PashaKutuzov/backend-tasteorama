import { recipeModel as Recipe } from '../models/recipesModel.js';
import { Ingredients } from '../models/ingredients.js';

export const searchRecipesController = async (req, res, next) => {
  const {
    title = '',
    category,
    ingredient = '',
    page = '1',
    limit = '12',
  } = req.query;

  let pageNum = Number(page);
  let limitNum = Number(limit);

  if (isNaN(pageNum) || pageNum <= 0) pageNum = 1;
  if (isNaN(limitNum) || limitNum <= 0) limitNum = 12;

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
      name: ingredient.trim(),
    }).sort({ name: 1 });

    if (matchedIngredients.length === 0) {
      return res.json({
        status: 'success',
        code: 200,
        data: { result: [] },
        message: 'No ingredients matched',
      });
    }

    const ingredientIds = matchedIngredients.map((i) => i._id.toString());
    filter['ingredients.id'] = { $in: ingredientIds };
  }

  const recipes = await Recipe.find(filter).skip(skip).limit(limitNum);
  const totalRecipes = await Recipe.countDocuments(filter);
  const totalPages = Math.ceil(totalRecipes / limitNum);

  res.json({
    status: 200,
    message: 'Successfully found all recipes!',
    data: {
      data: recipes,
      page: pageNum,
      perPage: limitNum,
      totalItems: totalRecipes,
      totalPages,
    },
  });
};
