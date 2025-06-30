import dotenv from 'dotenv';
dotenv.config();
import initMongoConnection from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import setupServer from './server.js';

(async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    await setupServer();
    console.log('Server setup completed successfully.');
  } catch (error) {
    console.error('Error while starting server:', error);
  }
})();
