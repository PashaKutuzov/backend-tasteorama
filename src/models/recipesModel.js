import mongoose from 'mongoose';

const recipesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
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
      ],
      default: null,
      required: true,
    },

    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Categories',
    //   required: true,
    // },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: null,
    },
    cals: {
      type: String,
      required: false,
      default: null,
    },
    thumb: {
      type: String,
      required: false,
      default: null,
    },
    time: {
      type: String,
      required: false,
    },
<<<<<<< HEAD

    // ingredients: [
    //   {
    //     id: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Ingredient', // посилання на колекцію інгредієнтів
    //       required: true,
    //     },
    //     measure: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
=======
    ingredients: {
      type: [String],
      enum: [
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
        'Haddock',
      ],
      default: [],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    // isFavorite: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // },
>>>>>>> origin/main
  },
  {
    timestamps: true,
  }
);
export const recipeModel = mongoose.model('Recipe', recipesSchema);
