import {
  getAllIngredients,
  createIngredient,
} from '../services/ingredients.js';
import { getEnvVar } from '../utils//getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getIngredientsController = async (req, res) => {
  const ingredients = await getAllIngredients();
  res.json({
    status: 200,
    message: 'Ingredients found successfully',
    data: ingredients,
  });
};
export const createIngredientController = async (req, res, next) => {
  try {
    const { body, file } = req;
    const ingredientData = { ...body };

    if (file) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      const imageUrl = useCloudinary
        ? await saveFileToCloudinary(file)
        : await saveFileToUploadDir(file);

      ingredientData.img = imageUrl;
    }

    const newIngredient = await createIngredient(ingredientData);

    res.status(201).json({
      status: 201,
      message: 'Ingredient created successfully',
      data: newIngredient,
    });
  } catch (error) {
    next(error);
  }
};
