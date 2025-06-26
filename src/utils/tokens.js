import { randomBytes } from 'crypto';

export const generateToken = () => randomBytes(30).toString('base64');
