import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import initMongoConnection from './db/initMongoConnection.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routers/authRouter.js';
import recipesRouter from './routers/recipes.js';
const app = express();

export default async function setupServer() {
  app.use(cookieParser());
  app.use(cors());
  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.use('/api/auth', authRouter);
  app.use('/api', recipesRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  try {
    const PORT = process.env.PORT || 3030;
    await initMongoConnection();

    app.listen(PORT, (error) => {
      if (error) {
        throw error;
      }

      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
