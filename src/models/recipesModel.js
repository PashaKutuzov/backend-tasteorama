import mongoose from 'mongoose';

const recipesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    thumb: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
export const recipeModel = mongoose.model('Recipe', recipesSchema);
