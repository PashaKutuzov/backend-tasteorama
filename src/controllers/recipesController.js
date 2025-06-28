import createHttpError from 'http-errors';
import {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  deleteRecipesById,
  patchRecipes,
} from '../services/recipesServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
export async function getRecipesController(req, res) {
  //   const recipeId = req.recipe._id;
  const { page, perPage } = parsePaginationParams(req.query);

  const recipes = await getAllRecipes({
    page,
    perPage,
  });
  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
}

export async function getRecipesByIdController(req, res) {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(req.params.recipeId);

  if (recipe === null) {
    throw createHttpError(404, 'Not found');
  }
  res.json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
}

export async function createrecipesController(req, res, next) {
  try {
    const { body, file } = req;

    const recipeData = { ...body };

    if (file) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      const thumbUrl = useCloudinary
        ? await saveFileToCloudinary(file)
        : await saveFileToUploadDir(file);

      recipeData.thumb = thumbUrl;
    } else if (body.thumb) {
      recipeData.thumb = body.thumb;
    }

    const recipe = await createRecipes(recipeData);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a recipe!',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

export async function patchRecipesController(req, res) {
  const { recipeId } = req.params;

  const result = await patchRecipes(recipeId, req.body);

  if (result === null) {
    throw createHttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a recipe!',
    data: result,
  });
}

export async function deleteRecipesByIdController(req, res) {
  const { recipeId } = req.params;

  const result = await deleteRecipesById(recipeId);
  console.log(result);
  if (result === null) {
    throw createHttpError(404, 'Not found');
  }
  res.status(204).end();
}
