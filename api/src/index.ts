import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Websocket from "./modules/websocket/websocket";
import CryptoSocket from "./modules/websocket/crypto.socket";
import { getCryptoDetails } from "./modules/crypto-api/cryptoApi";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript server");
});

app.get("/cryptos/profile/:id", async (req: Request, res: Response) => {
  const cryptoId = req.params.id;
  cryptoId && res.json(await getCryptoDetails(cryptoId));
  res.json({ error: true, message: "You need to provide an Id" });
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const io = Websocket.getInstance(server);
io.initializeHandlers([{ path: "/crypto", handler: new CryptoSocket() }]);
