import { Ingredients } from '../models/ingredients.js';
export const getAllIngredients = async () => {
  const ingredients = await Ingredients.find();
  return ingredients;
};
