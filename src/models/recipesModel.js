import mongoose from 'mongoose';

const ingredientInRecipeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      ref: 'Ingredient',
      required: true,
    },
    measure: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    time: {
      type: String,
    },
    cals: {
      type: Number,
    },
    ingredients: {
      type: [ingredientInRecipeSchema],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const recipeModel = mongoose.model('Recipe', recipeSchema);
