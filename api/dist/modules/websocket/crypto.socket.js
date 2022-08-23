"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoApi_1 = require("../crypto-api/cryptoApi");
class CryptoSocket {
    emitPrices(socket) {
        (0, cryptoApi_1.getPrice)()
            .then((rep) => socket.emit("crypto", rep))
            .catch((err) => {
            socket.emit("crypto", {
                error: true,
                message: "Error fetching data from API",
            });
        });
    }
    intervalPrice(socket) {
        this.emitPrices(socket);
        setInterval(() => this.emitPrices(socket), 20000);
    }
    handleConnection(socket) {
        socket.emit("ping", "Hi! I am a live socket connection");
        this.intervalPrice(socket);
    }
    handleDisconnect(socket) {
        console.log("Disconnected");
    }
    handleError(socket) {
        console.log("Socket Error");
    }
    middlewareImplementation(socket, next) {
        return next();
    }
}
exports.default = CryptoSocket;
