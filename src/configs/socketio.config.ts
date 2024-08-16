/** 
==============
SOCKET.IO SETUP CONFIGURATION
*/

import { Server } from 'socket.io';
import { server } from '../server';
import { CONNECTION, DISCONNECT, SOCKETIO_CONNECTED, SOCKETIO_DISCONNECTED } from '../core/constants';

export const io = new Server(server);

export const connectSocketIO = () => io.on(CONNECTION, (socket) => {
  console.log(SOCKETIO_CONNECTED);
  socket.on(DISCONNECT, () => {
    console.log(SOCKETIO_DISCONNECTED);
  });
});