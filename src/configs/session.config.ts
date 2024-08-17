/* 
===============
SESSION CONFIGURATIONS
*/

import session from 'express-session';
import { SESSION_SECRET, SECURE_COOKIE } from './env.config';


export const sessionConfig = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: SECURE_COOKIE === 'true' } 
});
