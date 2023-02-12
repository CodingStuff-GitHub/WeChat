import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the server (the HTTP server) object
const io = new Server(server);

// User Routes
import { router as userRoutes } from "./routes/userRoutes.js";
app.use("/api/v1", userRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

// Listen on the connection event for incoming sockets and log it to the console
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("chat message", (msg) => {});
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export default server;
