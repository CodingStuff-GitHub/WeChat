import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Nickname() {
  const [open, setOpen] = React.useState(true);
  const [nickname, setNickname] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("nickname", nickname);
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
