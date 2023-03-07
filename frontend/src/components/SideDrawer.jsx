import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { selectChat } from "../other/rootSlice";

function sortUsers(users) {
  // put the current user first, and then sort by nickname
  return users.sort((a, b) => {
    if (a.self) return -1;
    if (b.self) return 1;
    if (a.nickname < b.nickname) return -1;
    return a.nickname > b.nickname ? 1 : 0;
  });
}

const SideDrawer = ({ socket, drawerWidth }) => {
  const [users, setUsers] = React.useState([]);
  const { selectedChatId } = useSelector((state) => state.rootStore);
  const dispatch = useDispatch();

  React.useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.id === socket.id;
      });
      setUsers(sortUsers(users));
    });
    socket.on("user connected", (_message, nickname, _type, id) => {
      //add the user than send it for sorting
      setUsers(sortUsers([...users, { id, nickname, self: false }]));
    });
    socket.on("user disconnected", (_message, _nickname, _type, id) => {
      //remove user and sort again
      setUsers(sortUsers(users.filter((user) => user.id !== id)));
    });
  }, [socket, users]);

  return (
    <div>
      <Box
        position="fixed"
        sx={{
          zIndex: 10,
          backgroundColor: "#ffffff",
          width: `${drawerWidth}px`,
          top: 0,
          bottom: "auto",
        }}
      >
        <Toolbar>
          <FiberManualRecordIcon
            sx={{
              color: "green",
              width: "16px",
              height: "16px",
              marginRight: "8px",
            }}
          />
          <Typography variant="h7" noWrap component="div">
            Users Online
          </Typography>
        </Toolbar>
        <Divider />
      </Box>
      <Toolbar />
      {/* List of Users */}
      <List>
        <ListItem key={0} disablePadding>
          <ListItemButton
            selected={selectedChatId === 0}
            onClick={() => dispatch(selectChat({ selectedChatId: 0 }))}
          >
            <ListItemText primary={"Global"} />
          </ListItemButton>
        </ListItem>
        {/* TESTING SCROLL FROM BELOW */}
        <ListItem key={0} disablePadding>
          <ListItemButton
            selected={selectedChatId === 0}
            onClick={() => dispatch(selectChat({ selectedChatId: 0 }))}
          >
            <ListItemText primary={"FIRST"} />
          </ListItemButton>
        </ListItem>
        {[...Array(50)].map((elementInArray, index) => (
          <ListItem key={elementInArray} disablePadding>
            <ListItemButton
              selected={selectedChatId === 0}
              onClick={() => dispatch(selectChat({ selectedChatId: 0 }))}
            >
              <ListItemText primary={"Global" + elementInArray} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={0} disablePadding>
          <ListItemButton
            selected={selectedChatId === 0}
            onClick={() => dispatch(selectChat({ selectedChatId: 0 }))}
          >
            <ListItemText primary={"LAST"} />
          </ListItemButton>
        </ListItem>
        {/* TESTING SCROLL ENDS HERE */}
      </List>
      <Toolbar />
      <Box
        position="fixed"
        sx={{
          zIndex: 1000,
          backgroundColor: "#ffffff",
          width: 240,
          top: "auto",
          bottom: 0,
        }}
      >
        <Toolbar>
          <FiberManualRecordIcon
            sx={{
              color: "green",
              width: "16px",
              height: "16px",
              marginRight: "8px",
            }}
          />
          <Typography variant="h7" noWrap component="div">
            Users Online
          </Typography>
        </Toolbar>
        <Divider />
      </Box>
    </div>
  );
};

export default SideDrawer;
