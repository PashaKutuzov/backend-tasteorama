export const mapRecipeFields = (body) => {
  return {
    title: body.name,
    description: body.descr,
    time: body.cookiesTime,
    calories: body.cals,
    category: body.category,
    ingredients: body.ingredients,
    instructions: body.instruction,
    thumb: body.recipeImg,
  };
};
