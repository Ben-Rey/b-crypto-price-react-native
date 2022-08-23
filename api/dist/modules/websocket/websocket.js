"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const WEBSOCKET_CORS = {
    origin: "*",
    methods: ["GET", "POST"],
};
class Websocket extends socket_io_1.Server {
    constructor(httpServer) {
        super(httpServer, {
            cors: WEBSOCKET_CORS,
        });
    }
    static getInstance(httpServer) {
        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer);
        }
        return Websocket.io;
    }
    initializeHandlers(socketHandlers) {
        socketHandlers.forEach((element) => {
            let namespace = Websocket.io
                .of(element.path)
                .on("connection", (socket) => {
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
exports.default = Websocket;
