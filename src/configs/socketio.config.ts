/** 
==============
SOCKET.IO SETUP CONFIGURATION
*/

import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { CONNECTION, DELETE, DISCONNECT, GET, POST, PUT, SOCKETIO_CONNECTED, SOCKETIO_DISCONNECTED } from '../core/constants';
import { BASE_URL } from './env.config';
import { handleIncomingEvent } from '../core/websocket/websocket';

let io: Server;

export const initializeSocketIO = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: BASE_URL,
      methods: [GET, POST, PUT, DELETE],
    }
  });

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