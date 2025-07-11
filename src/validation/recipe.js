import Joi from 'joi';
import { Categories } from '../models/categories.js';

export const updateRecipeSchema = Joi.object({
  title: Joi.string().min(1).max(64),
  cals: Joi.string().min(1).max(10000),
  area: Joi.string().min(1).max(100),
  description: Joi.string().min(1).max(200),
  time: Joi.string().min(1).max(360),
  instructions: Joi.string().min(1).max(1200),
  thumb: Joi.string(),
  owner: Joi.string(),
  category: Joi.string().valid(
    'Seafood',
    'Lamb',
    'Starter',
    'Chicken',
    'Beef',
    'Dessert',
    'Vegan',
    'Pork',
    'Vegetarian',
    'Miscellaneous',
    'Pasta',
    'Breakfast',
    'Side',
    'Goat',
    'Soup'
  ),
});

const categoryValidator = Joi.string().custom(async (value, helpers) => {
  const allowedCategories = await getAllowedCategories();
  if (!allowedCategories.includes(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'Category validation');

async function getAllowedCategories() {
  try {
    const categories = await Categories.find({}, 'name -_id').lean();
    return categories.map((cat) => cat.name);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

const ingredientSchema = Joi.object({
  name: Joi.string().required(),
  measure: Joi.string().required(),
});

export const recipeCreateSchema = Joi.object({
  name: Joi.string().max(64).required(),
  decr: Joi.string().max(200).required(),
  cookiesTime: Joi.number().min(1).max(360).required(),
  cals: Joi.number().min(1).max(10000).optional(),
  category: categoryValidator.required(),
  ingredient: Joi.array().items(ingredientSchema).min(2).max(16).required(),
  instruction: Joi.string().max(1200).required(),
  recipeImg: Joi.any().optional(),
});
