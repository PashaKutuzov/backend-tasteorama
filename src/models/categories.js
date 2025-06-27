import mongoose, { Schema } from 'mongoose';
const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Categories = mongoose.model('Categories', categoriesSchema);
