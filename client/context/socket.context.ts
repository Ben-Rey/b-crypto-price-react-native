import {createContext} from 'react';
import {Socket} from 'socket.io-client';

interface ISocketContext {
  socket: Socket;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext | null>(null);

export default SocketContext;
