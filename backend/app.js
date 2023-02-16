import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the server (the HTTP server) object
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// User Routes
import { router as userRoutes } from "./routes/userRoutes.js";
app.use("/api/v1", userRoutes);
console.log(fileURLToPath(import.meta.url));
console.log(__dirname);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (_req, res) => {
  console.log(fileURLToPath(import.meta.url));
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Listen on the connection event for incoming sockets and log it to the console
io.on("connection", (socket) => {
  console.log(socket.id);
  io.emit("user connected");
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
  socket.on("disconnect", () => {
    io.emit("user disconnected");
  });
});

export default server;
