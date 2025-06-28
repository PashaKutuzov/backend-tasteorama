function parsedType(value) {
  const isString = typeof value === 'string';
  if (!isString) {
    return;
  }
  const isType = (value) =>
    [
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
      'Soup',
    ].includes(value);
  if (isType(value)) return value;
}
// function parsedIsFavourite(value) {
//   if (value === 'true') return true;
//   if (value === 'false') return false;
//   return;
// }
export function parseFilterParams(query) {
  const { type } = query;

  const parseType = parsedType(type);
  //   const parseIsFavourite = parsedIsFavourite(isFavourite);
  return {
    type: parseType,
    // isFavourite: parseIsFavourite,
  };
}
