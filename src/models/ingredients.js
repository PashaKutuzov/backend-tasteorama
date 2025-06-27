import mongoose, { Schema, model } from 'mongoose';

const ingredientsSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String },
  img: { type: String },
});

export const Ingredients = mongoose.model('Ingredient', ingredientsSchema);
