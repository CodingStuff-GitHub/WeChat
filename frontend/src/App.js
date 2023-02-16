import io from "socket.io-client";
import React, { useState, useEffect } from "react";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  function sendMessage() {
    socket.emit("message", message);
  }

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};
export default App;
