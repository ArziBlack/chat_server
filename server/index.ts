import path from "path";
import express from "express";
import { createServer } from "http";
import { getIO, initIO } from "./socket";

const app = express();

app.use("/", express.static(path.join(__dirname, "static")));

const httpServer = createServer(app);

let port = process.env.PORT || 3500;

initIO(httpServer);

httpServer.listen(port, () => {
  console.log("Server started on", port);
});

getIO();
