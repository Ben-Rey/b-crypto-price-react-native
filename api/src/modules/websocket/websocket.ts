import { Server, Socket } from "socket.io";

const WEBSOCKET_CORS = {
  origin: "*",
  methods: ["GET", "POST"],
};

class Websocket extends Server {
  private static io: Websocket;

  constructor(httpServer: any) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static getInstance(httpServer?: any): Websocket {
    if (!Websocket.io) {
      Websocket.io = new Websocket(httpServer);
    }

    return Websocket.io;
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((element) => {
      let namespace = Websocket.io
        .of(element.path)
        .on("connection", (socket: Socket) => {
          element.handler.handleConnection(socket);
          socket.on("connect_error", () => {
            element.handler.handleError(socket);
          });
          socket.on("disconnect", () => {
            element.handler.handleDisconnect(socket);
          });
        });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}

export default Websocket;
