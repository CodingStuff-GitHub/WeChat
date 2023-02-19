import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import errorMiddleware from "./middleware/error.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

//Routes
import { router as userRoutes } from "./routes/userRoutes.js";
app.use("/api/v1", userRoutes);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

import socketFunctions from "./utils/socket.js";
//Create server and add socket functionality
const server = http.createServer(app);

socketFunctions(server);

// Applies the error middleware to the application.
app.use(errorMiddleware);

export default server;
