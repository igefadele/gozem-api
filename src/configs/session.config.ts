/* 
===============
SESSION CONFIGURATIONS
*/

import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

export const sessionConfig = session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.SECURE_COOKIE === 'true' } 
});
