"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const websocket_1 = __importDefault(require("./modules/websocket/websocket"));
const crypto_socket_1 = __importDefault(require("./modules/websocket/crypto.socket"));
const cryptoApi_1 = require("./modules/crypto-api/cryptoApi");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript server");
});
app.get("/cryptos/profile/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cryptoId = req.params.id;
    cryptoId && res.json(yield (0, cryptoApi_1.getCryptoDetails)(cryptoId));
    res.json({ error: true, message: "You need to provide an Id" });
}));
const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
const io = websocket_1.default.getInstance(server);
io.initializeHandlers([{ path: "/crypto", handler: new crypto_socket_1.default() }]);
