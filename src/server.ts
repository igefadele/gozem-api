// ===========
// API SERVER FILE


import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { sessionConfig } from './configs/session.config';
import { rateLimiter } from './configs/rate_limit.config';
import { logger } from './configs/logger.config';

import apiRoutes from './routes';
import { serverErrorHandler } from './core/middlewares/server_error_handler.middleware';
import { notFoundHandler } from './core/middlewares/not_found_handler.middleware';


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(sessionConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger);
app.use(rateLimiter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: "Server works"})
});
app.use('/api', apiRoutes);

app.use(serverErrorHandler);
app.use(notFoundHandler);

// Start server and listens on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

