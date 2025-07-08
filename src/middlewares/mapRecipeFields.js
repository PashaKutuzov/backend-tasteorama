export const mapRecipeFields = (body) => {
  return {
    title: body.name,
    description: body.decr,
    time: body.cookiesTime,
    calories: body.cals,
    category: body.category,
    ingredients: body.ingredient,
    measure: body.ingredientAmount,
    instructions: body.instruction,
    thumb: body.recipeImg,
  };
};
