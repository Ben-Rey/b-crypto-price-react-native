import { Socket } from "socket.io";
import { getPrice } from "../crypto-api/cryptoApi";
import MySocketInterface from "./mySocketInterface";

class CryptoSocket implements MySocketInterface {
  private emitPrices(socket: Socket) {
    getPrice()
      .then((rep) => socket.emit("crypto", rep))
      .catch((err) => {
        socket.emit("crypto", {
          error: true,
          message: "Error fetching data from API",
        });
      });
  }

  private intervalPrice(socket: Socket) {
    this.emitPrices(socket);
    setInterval(() => this.emitPrices(socket), 20000);
  }

  handleConnection(socket: Socket) {
    socket.emit("ping", "Hi! I am a live socket connection");
    this.intervalPrice(socket);
  }

  handleDisconnect(socket: Socket) {
    console.log("Disconnected");
  }

  handleError(socket: Socket) {
    console.log("Socket Error");
  }

  middlewareImplementation(socket: Socket, next: any) {
    return next();
  }
}

export default CryptoSocket;
