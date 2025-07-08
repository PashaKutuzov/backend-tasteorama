import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
} from '../services/authServices.js';
import { ONE_DAY } from '../constants/index.js';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES } from '../constants/index.js';

const setupSession = (res, session, maxAge = ONE_DAY) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + maxAge),
  });
  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expires: new Date(Date.now() + maxAge),
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  const session = await loginUser(req.body);
  console.log(user);

  setupSession(res, session);
  res.status(201).json({
    status: 201,
    message: `User created successfully`,
    data: { accessToken: session.accessToken },
  });
};

const maxAge = FIFTEEN_MINUTES;

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  const expiresIn = new Date(Date.now() + maxAge);

  res.json({
    status: 200,
    message: 'Login successfully',
    data: {
      accessToken: session.accessToken,
      expiresIn: expiresIn,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await logoutUser(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Missing session or refresh token cookies');
  }

  const session = await refreshUsersSession({ sessionId, refreshToken });

  setupSession(res, session);
  const expiresIn = new Date(Date.now() + maxAge);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      expiresIn: expiresIn,
    },
  });
};
