import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Nickname = ({ socket }) => {
  const [open, setOpen] = React.useState(true);
  const [nickname, setNickname] = React.useState("");
  React.useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "Invalid nickname") {
        setOpen(true);
        console.log(err.message);
      }
      socket.off("connect_error");
    });
  });

  //Close the dialog
  const handleClose = () => {
    if (nickname) {
      setOpen(false);
      socket.auth = { nickname };
      socket.connect();
    }
  };

  // Check if the Enter key was pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClose();
    }
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Pick a Nickname</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setNickname(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Nickname"
            fullWidth
            variant="standard"
            onKeyPress={handleKeyPress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Nickname;
