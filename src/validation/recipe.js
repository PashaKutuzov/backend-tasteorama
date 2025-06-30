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
