/** 
==============
SOCKET.IO SETUP CONFIGURATION
*/

import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { CONNECTION, DISCONNECT, SOCKETIO_CONNECTED, SOCKETIO_DISCONNECTED } from '../core/constants';

let io: Server;

export const initializeSocketIO = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    }
  });

  io.on(CONNECTION, (socket) => {
    console.log(SOCKETIO_CONNECTED);
    socket.on(DISCONNECT, () => {
      console.log(SOCKETIO_DISCONNECTED);
    });
  });

  return io;
};

export { io };