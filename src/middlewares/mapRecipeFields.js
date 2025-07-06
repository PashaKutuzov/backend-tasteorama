export const mapRecipeFields = (body) => {
  return {
    title: body.name,
    description: body.decr,
    time: body.cookiesTime,
    calories: body.cals,
    category: body.category,
    ingredients: body.ingredient,
    instructions: body.instruction,
    thumb: body.recipeImg,
    cals: body.cals,
  };
};
