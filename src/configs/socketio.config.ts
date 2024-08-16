/** 
==============
SOCKET.IO SETUP CONFIGURATION
*/

import { Server } from 'socket.io';
import { server } from '../server';

export const io = new Server(server);

export const connectSocketIO = () => io.on('connection', (socket) => {
  console.log('SocketIO connection from a client is established');
});