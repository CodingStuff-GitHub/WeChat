import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";

const Chatroom = ({ socket, drawerWidth }) => {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ref = React.useRef(null);

  // Message is sent to the server
  function sendMessage() {
    if (message) {
      socket.emit("message", message);
      setMessage("");
    }
  }

  //Check for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("message", (message, nickname, type) => {
        setIndex(index + 1);
        setMessages([...messages, { message, nickname, index, type }]);
      });
      socket.on("user connected", (message, nickname, type) => {
        setIndex(index + 1);
        setMessages([...messages, { message, nickname, index, type }]);
      });
      socket.on("user disconnected", (message, nickname, type) => {
        setIndex(index + 1);
        setMessages([...messages, { message, nickname, index, type }]);
      });
    }
  }, [index, messages, socket]);

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
    <>
      <Box sx={{ pb: 7 }}>
        {/* Messages Container */}
        <List sx={{ pb: 7 }}>
          {messages.map((singlemessage) => (
            <div
              key={
                singlemessage.nickname +
                singlemessage.message +
                singlemessage.index
              }
            >
              {singlemessage.type === "message" ? (
                <ListItem divider>
                  <ListItemText
                    primary={singlemessage.message}
                    secondary={"By " + singlemessage.nickname}
                  />
                </ListItem>
              ) : (
                <ListItem
                  divider
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Chip label={singlemessage.message} variant="outlined" />
                </ListItem>
              )}
            </div>
          ))}
          <div ref={ref} />
        </List>
        {/* New Message TextField Container */}
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
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
    </>
  );
};

export default Chatroom;
