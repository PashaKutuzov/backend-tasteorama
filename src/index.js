import dotenv from 'dotenv';
dotenv.config();

import setupServer from './server.js';

(async () => {
  try {
    await setupServer();
  } catch (error) {
    console.error('Error while starting server:', error);
  }
})();
