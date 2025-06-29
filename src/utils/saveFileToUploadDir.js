import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
export const saveFileToUploadDir = async (file) => {
  const tempPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const uploadPath = path.join(UPLOAD_DIR, file.filename);

  await fs.rename(tempPath, uploadPath);

  const fileUrl = `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
  return fileUrl;
};
