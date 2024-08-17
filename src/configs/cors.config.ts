/* 
===============
CORS CONFIGURATIONS
*/

import cors from 'cors';
import { GET, POST, PUT, DELETE } from '../core/constants';
import { BASE_URL } from './env.config';

export const corsConfig = cors({
  origin: BASE_URL,
  methods: [GET, POST, PUT, DELETE],
})
