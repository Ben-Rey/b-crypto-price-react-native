import { Socket } from "socket.io";

interface MySocketInterface {
  handleConnection(socket: Socket): void;
  handleDisconnect(socket: Socket): void;
  handleError(socket: Socket): void;

  middlewareImplementation?(soccket: Socket, next: any): void;
}

export default MySocketInterface;
