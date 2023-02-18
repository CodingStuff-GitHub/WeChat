import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Nickname = () => {
  const [open, setOpen] = React.useState(true);
  const [nickname, setNickname] = React.useState("");

  //Check if the nickname is already set
  React.useEffect(() => {
    if (sessionStorage.getItem("nickname")) {
      setOpen(false);
    }
  }, []);

  //Close the dialog
  const handleClose = () => {
    if (nickname) {
      setOpen(false);
      sessionStorage.setItem("nickname", nickname);
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
