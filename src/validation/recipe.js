import Joi from 'joi';
export const recipeSchema = Joi.object({
  title: Joi.string().min(1).max(64).required(),
  cals: Joi.string().min(1).max(10000),
  area: Joi.string().min(1).max(100),
  description: Joi.string().min(1).max(200).required(),
  time: Joi.string().min(1).max(360).required(),
  instructions: Joi.string().min(1).max(1200).required(),
  thumb: Joi.string().default(null),
  owner: Joi.string(),
  ingredients: Joi.array()
    .items(
      Joi.string().valid(
        'Squid',
        'Cabbage',
        'Baking Powder',
        'Smoked Haddock',
        'Pears',
        'Spring Onions',
        'Ginger Cordial',
        'Almond Extract',
        'Tinned Tomatos',
        'Minced Beef',
        'Gruyère',
        'Powdered Sugar',
        'Stilton Cheese',
        'Pork',
        'Sake',
        'Cayenne Pepper',
        'Jalapeno',
        'Barbeque Sauce',
        'Scotch Bonnet',
        'Haddock'
      )
    )
    .default([]),
  category: Joi.string()
    .valid(
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
    )
    .required(),
});

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

import mongoose from 'mongoose';

const objectIdValidator = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId validation');

const ingredientSchema = Joi.object({
  id: objectIdValidator.required(),
  measure: Joi.string().required(),
});

export const recipeCreateSchema = Joi.object({
  name: Joi.string().max(64).required(),
  descr: Joi.string().max(200).required(),
  cookTime: Joi.number().min(1).max(360).required(),
  cals: Joi.number().min(1).max(10000).optional(),
  category: objectIdValidator.required(),
  ingredients: Joi.array().items(ingredientSchema).min(2).max(16).required(),
  instruction: Joi.string().max(1200).required(),
  recipeImg: Joi.any().optional(),
  owner: objectIdValidator.optional(),
});
