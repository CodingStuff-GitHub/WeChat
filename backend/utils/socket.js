import { Server } from "socket.io";

const socketFunctions = (server) => {
  // Initialize a new instance of socket.io by passing the server (the HTTP server) object
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  //Middleware for checking the nickname
  io.use((socket, next) => {
    const nickname = socket.handshake.auth.nickname;
    if (!nickname || nickname === "admin") {
      console.log("Invalid: " + nickname);
      return next(new Error("Invalid nickname", 401));
    }
    socket.nickname = nickname;
    next();
  });

  //New Connection
  io.on("connection", (socket) => {
    io.emit(
      "user connected",
      `${socket.nickname} connected`,
      socket.nickname,
      "info"
    );
    socket.on("message", (msg) => {
      io.emit("message", msg, socket.nickname, "message");
    });
    socket.on("disconnect", () => {
      io.emit(
        "user disconnected",
        `${socket.nickname} disconnected`,
        socket.nickname,
        "info"
      );
    });
  });
};
export default socketFunctions;
