import React, {useEffect, useState} from 'react';
import SocketContext from './socket.context';
import {Socket} from 'socket.io-client';

interface SocketProviderProps {
  children: React.ReactNode;
  socket: Socket;
}

const SocketProvider = ({children, socket}: SocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('crypto');
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{socket, isConnected}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
