import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import initMongoConnection from './db/initMongoConnection.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routers/authRouter.js';
import userRoutes from './routers/userRoutes.js';
import recipesRouter from './routers/recipes.js';
import categoriesRouter from './routers/categories.js';
import ingredientsRouter from './routers/ingredients.js';
import { UPLOAD_DIR } from './constants/index.js';

import { swaggerDocs } from './middlewares/swaggerDocs.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-tasteorama.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

export default async function setupServer() {
  app.use(cookieParser());
  app.use(express.json());

  if (process.env.NODE_ENV !== 'development') {
    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      })
    );
  }

  app.use('/api-docs', swaggerDocs());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRoutes);
  app.use('/api', recipesRouter);

  app.use('/api', categoriesRouter);
  app.use('/api', ingredientsRouter);

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
