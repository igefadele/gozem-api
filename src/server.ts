/* ===========
API SERVER FILE 
*/

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { sessionConfig } from './configs/session.config';
import { rateLimiter } from './configs/rate_limit.config';
import { logger } from './configs/logger.config';

import apiRoutes from './routes';
import { serverErrorHandler } from './core/middlewares/server_error_handler.middleware';
import { notFoundHandler } from './core/middlewares/not_found_handler.middleware';
import { connectDB } from './configs/databases/mongodb.config';//
import { initializeSocketIO } from './configs/socketio.config';
import { corsConfig } from './configs/cors.config';
import { BASE_URL, PORT } from './configs/env.config';


const app = express();
export const server = createServer(app);

// Run the MongoDB Connection Function
connectDB(); 

// Run the SocketIO Connection Function
initializeSocketIO(server);

app.use(sessionConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsConfig);
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger);
app.use(rateLimiter);

app.use('/api', apiRoutes);

app.use(serverErrorHandler);
app.use(notFoundHandler);

// Start server and listens on the specified PORT
server.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
      console.log('Process terminated');
  });
});


