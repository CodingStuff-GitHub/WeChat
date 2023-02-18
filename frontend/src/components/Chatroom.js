import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Chatroom = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const nickname = sessionStorage.getItem("nickname");
  const ref = React.useRef(null);
  //Starting new socket connection
  useEffect(() => {
    let uri = "";
    if (process.env.NODE_ENV !== "production") {
      uri = "http://localhost:4000";
    }
    const newSocket = io(uri, { autoConnect: false });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.onAny((event, ...args) => {
      console.log(event, args);
    });
    return () => newSocket.close();
  }, []);

  // Message is sent to the server
  function sendMessage() {
    if (message) {
      socket.emit("message", { message, nickname });
      setMessage("");
    }
  }

  //Check for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setMessages([...messages, data]);
      });
    }
  }, [messages, socket]);

  //If new messages are received go to last to show it
  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // check if the Enter key was pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Box sx={{ pb: 7 }}>
      {/* Messages Container */}
      <List sx={{ pb: 7 }}>
        {messages.map((singlemessage) => (
          <ListItem key={singlemessage} divider>
            <ListItemText
              primary={singlemessage.message}
              secondary={"By " + singlemessage.nickname}
            />
          </ListItem>
        ))}
        <div ref={ref} />
      </List>
      {/* New Message TextField Container */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Stack direction="row" spacing={2} sx={{ margin: 2 }}>
          <TextField
            id="message"
            label="Message"
            variant="standard"
            value={message}
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={sendMessage} variant="outlined">
            Send
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Chatroom;
