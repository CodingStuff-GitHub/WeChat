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
    if (
      !nickname ||
      nickname.toLowerCase() === "admin" ||
      nickname.toLowerCase() === "global"
    ) {
      console.log("Invalid: " + nickname);
      return next(new Error("Invalid nickname", 401));
    }
    socket.nickname = nickname;
    next();
  });

  //New Connection
  io.on("connection", (socket) => {
    // Emit user connected event
    io.emit(
      "user connected",
      `${socket.nickname} connected`,
      socket.nickname,
      "info",
      socket.id
    );

    // Emit when a user disconnects
    socket.on("disconnect", () => {
      io.emit(
        "user disconnected",
        `${socket.nickname} disconnected`,
        socket.nickname,
        "info",
        socket.id
      );
    });

    // Send all existing users to the client
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        id: id,
        nickname: socket.nickname,
      });
    }
    socket.emit("users", users);

    // Emit when a new message arrives
    socket.on("message", (msg) => {
      io.emit("message", msg, socket.nickname, "message");
    });

    //Emit private message
    socket.on("private message", ({ content, to }) => {
      socket.to(to).emit("private message", {
        content,
        from: socket.id,
      });
    });
  });
};
export default socketFunctions;
