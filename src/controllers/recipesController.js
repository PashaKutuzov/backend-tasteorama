import createHttpError from 'http-errors';
import {
  createRecipes,
  getAllRecipes,
  // getUsersRecipeById,
  getRecipes,
  // getRecipeById,
  deleteRecipesById,
  patchRecipes,
  addFavoriteRecipe,
  deleteFavoriteRecipe,
  getFavoriteRecipes,
  getRecipeById,
} from '../services/recipesServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { UsersCollection } from '../models/userModel.js';

export async function getAllRecipesController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const recipes = await getRecipes({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found all recipes!',
    data: recipes,
  });
}
export async function getRecipesByIdController(req, res) {
  const { recipeId } = req.params;

  const recipe = await getRecipeById(recipeId);

  if (recipe === null) {
    throw createHttpError(404, 'Not found');
  }
  // if (recipe.userId.toString() !== userId.toString()) {
  //   throw new createHttpError.Forbidden('Access denied for recipes');
  // }
  res.json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
}

export async function getRecipesController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const recipes = await getAllRecipes({
    page,
    perPage,
    userId,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
}

// export async function getUsersRecipesByIdController(req, res) {
//   const { recipeId } = req.params;
//   const userId = req.user._id;
//   const recipe = await getUsersRecipeById(recipeId, userId);

//   if (recipe === null) {
//     throw createHttpError(404, 'Not found');
//   }
//   // if (recipe.userId.toString() !== userId.toString()) {
//   //   throw new createHttpError.Forbidden('Access denied for recipes');
//   // }
//   res.json({
//     status: 200,
//     message: `Successfully found recipe with id ${recipeId}!`,
//     data: recipe,
//   });
// }

export async function createrecipesController(req, res, next) {
  try {
    const { body, file, user } = req;

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
    // recipeData.userId = user._id;
    recipeData.owner = user._id;

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

export async function patchRecipesController(req, res, next) {
  try {
    const { recipeId } = req.params;
    const userId = req.user._id;
    const { body, file } = req;

    const recipeData = { ...body };

    if (file) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      const thumbUrl = useCloudinary
        ? await saveFileToCloudinary(file)
        : await saveFileToUploadDir(file);
      recipeData.thumb = thumbUrl;
    }

    const result = await patchRecipes(recipeId, recipeData, userId);

    if (result === null) {
      throw createHttpError(404, 'Not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a recipe!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteRecipesByIdController(req, res) {
  const { recipeId } = req.params;
  const userId = req.user._id;
  const result = await deleteRecipesById(recipeId, userId);
  console.log(result);
  if (result === null) {
    throw createHttpError(404, 'Not found');
  }
  res.status(204).end();
}

export async function getFavoriteRecipeController(req, res, next) {
  try {
    const userId = req.user._id;

    // const recipes = await getFavoriteRecipes(userId);
    // data: recipes,

    const user = await UsersCollection.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Favorite recipes retrieved successfully',
      data: user.favorites,
    });
  } catch (error) {
    next(error);
  }
}

export async function addFavoriteRecipeController(req, res, next) {
  try {
    const userId = req.user._id;

    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({ message: 'Recipe ID is required' });
    }

    const user = await addFavoriteRecipe(userId, recipeId);

    // if (!user) {
    //   throw createHttpError(404, 'Recipe not found or access denied');
    // }

    res.status(201).json({ message: 'Recipe added to favorites', data: user });
  } catch (error) {
    next(error);
  }
}

export async function deleteFavoriteRecipeController(req, res, next) {
  const userId = req.user._id;

  const { id: recipeId } = req.params;
  const user = await deleteFavoriteRecipe(userId, recipeId);
  if (!user) {
    throw createHttpError(404, 'Recipe not found or access denied');
  }
  res.status(200).json({
    status: 200,
    message: 'Recipe removed from favorites',
    data: user,
  });
}
