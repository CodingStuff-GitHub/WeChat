import io from "socket.io-client";
import React, { useState, useEffect } from "react";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let uri = "";
    if (process.env.NODE_ENV !== "production") {
      uri = "http://localhost:4000";
    }
    const newSocket = io(uri);
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
        setMessages([...messages, data]);
      });
    }
  }, [messages, socket]);

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <div>
        {messages.map((singleMessage) => {
          return <li key={singleMessage}>{singleMessage}</li>;
        })}
      </div>
    </div>
  );
};
export default App;
