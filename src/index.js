import dotenv from 'dotenv';
dotenv.config();
console.log('Starting app...');
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('DB:', process.env.MONGODB_DB);
console.log('USER:', process.env.MONGODB_USER);
console.log('PASSWORD:', process.env.MONGODB_PASSWORD);
import setupServer from './server.js';

(async () => {
  try {
    await setupServer();
  } catch (error) {
    console.error('Error while starting server:', error);
  }
})();
