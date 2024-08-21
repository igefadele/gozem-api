/* 
===============
CORS CONFIGURATIONS
*/

import cors from 'cors';
import { GET, POST, PUT, DELETE } from '../constants';
import { BASE_URL } from '../../configs/env.config';

export const allowedOrigins = [
  BASE_URL,
  "http://localhost:4200",
  "http://127.0.0.1:5500",
  "https://logistics-tracker.onrender.com",
  "https://logistics-driver.onrender.com",
  "https://logistics-admin-t9z7.onrender.com",
]

export const corsOption = {
  origin: (origin: string | undefined, callback: (error: Error | null, allowed?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: [GET, POST, PUT, DELETE],
}

export const corsConfig = cors(corsOption);
