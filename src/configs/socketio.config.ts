/** 
==============
SOCKET.IO SETUP CONFIGURATION
*/

import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { CONNECTION, DELETE, DISCONNECT, GET, POST, PUT, SOCKETIO_CONNECTED, SOCKETIO_DISCONNECTED } from '../core/constants';
import { BASE_URL } from './env.config';
import { handleIncomingEvent } from '../data/websocket/websocket';
import { corsOption } from '../core/middlewares/cors.middleware';

let io: Server;

export const initializeSocketIO = (server: HttpServer) => {
  io = new Server(server, {cors: corsOption});

  io.on(CONNECTION, (socket) => {
    console.log(SOCKETIO_CONNECTED);

    /// To handle all incoming websocket events
    handleIncomingEvent(socket);

    socket.on(DISCONNECT, () => {
      console.log(SOCKETIO_DISCONNECTED);
    });
  });

  

  return io;
};

export { io };