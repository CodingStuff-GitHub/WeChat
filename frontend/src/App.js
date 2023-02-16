import io from "socket.io-client";
import React, { useState, useEffect } from "react";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  function sendMessage() {
    console.log("Sent message");
    socket.emit("message", message);
  }

  useEffect(() => {
    console.log("message check");
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
