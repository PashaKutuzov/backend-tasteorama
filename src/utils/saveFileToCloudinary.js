// import cloudinary from 'cloudinary';
// import fs from 'node:fs/promises';
// import { getEnvVar } from './getEnvVar.js';
// import { CLOUDINARY } from '../constants/index.js';

// cloudinary.v2.config({
//   secure: true,
//   cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
//   api_key: getEnvVar(CLOUDINARY.API_KEY),
//   api_secret: getEnvVar(CLOUDINARY.API_SECRET),
// });
// export const saveFileToCloudinary = async (file) => {
//   const respons = await cloudinary.v2.uploader.upload(file.path);
//   await fs.unlink(file.path); // Delete the file after upload
//   return respons.secure_url;
// };
