import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
} from '../services/authServices.js';

import createHttpError from 'http-errors';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expiresIn: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expiresIn: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  await registerUser(req.body);
  const session = await loginUser(req.body);

  setupSession(res, session);
  res.status(201).json({
    status: 201,
    message: `User created successfully`,
    data: {
      accessToken: session.accessToken,
      expiresIn: session.accessTokenValidUntil,
    },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Login successfully',
    data: {
      accessToken: session.accessToken,
      expiresIn: session.accessTokenValidUntil,
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

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      expiresIn: session.accessTokenValidUntil,
    },
  });
};
