import { Ingredients } from '../models/ingredients.js';

export async function getIngredientIds(ingredientsArray) {
  try {
    const ingredientsWithId = [];

    for (let ingredient of ingredientsArray) {
      const foundIngredient = await Ingredients.findOne({
        name: ingredient.name,
      });

      if (foundIngredient) {
        ingredientsWithId.push({
          id: foundIngredient._id,
          measure: ingredient.measure,
        });
      } else {
        throw new Error(`Ingredient not found: ${ingredient.name}`);
      }
    }

    return ingredientsWithId;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving ingredient IDs');
  }
}
