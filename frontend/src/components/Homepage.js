import React from "react";
import io from "socket.io-client";
import ResponsiveDrawer from "./Drawer";
import Nickname from "./Nickname";

const Homepage = () => {
  let uri = "";
  if (process.env.NODE_ENV !== "production") {
    uri = "http://localhost:4000";
  }
  const newSocket = io(uri, { autoConnect: false });
  newSocket.onAny((event, ...args) => {
    console.log("Log - " + event, args);
  });
  return (
    <>
      <Nickname socket={newSocket} />
      <ResponsiveDrawer socket={newSocket} />
    </>
  );
};

export default Homepage;
