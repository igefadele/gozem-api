/* 
===============
CORS CONFIGURATIONS
*/

import cors from 'cors';

export const corsConfig = () => {
  cors({
    origin: "http://localhost:3000"
  })
}