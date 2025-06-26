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
  },
  {
    timestamps: true,
  }
);
export const recipeModel = mongoose.model('Recipe', recipesSchema);
