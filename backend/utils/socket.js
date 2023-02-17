import { Server } from "socket.io";

const socketFunctions = (server) => {
  // Initialize a new instance of socket.io by passing the server (the HTTP server) object
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

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
};
export default socketFunctions;
