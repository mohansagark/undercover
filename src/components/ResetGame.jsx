import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useLocalStorage from "use-local-storage";
import React, { useState } from "react";

const ResetGame = () => {
  const [open, setOpen] = useState(false);
  const [existingSession, setExistingSession] =
    useLocalStorage("existingSession");
  const handleClose = () => setOpen(false);

  const handleReset = () => {
    console.log("first");
    setExistingSession(false);
    window.location.reload();
    handleClose();
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="!absolute bottom-10 right-0 mx-10"
        variant="contained"
      >
        Reset Game
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Game</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reset the game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReset} autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResetGame;
