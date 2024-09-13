import { Box, Button, Card, CardContent, Snackbar } from "@mui/material";
import React, { useState } from "react";
import ResetGame from "./ResetGame";

const GameVoting = ({ players, eliminatePlayers, onNewGame }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  console.log(players);

  const handleClickOpen = (player) => {
    if (player.status === "Revealed") {
      eliminatePlayers(player);
      if (player.role === "spy") {
        setMessage("You have eliminated a spy");
        setSeverity("error");
      } else {
        setMessage("You have eliminated a civilian");
        setSeverity("success");
      }
      setOpen(true);
    }
  };
  return (
    <>
      <Box className="flex flex-wrap justify-between gap-4">
        {players.map((player, index) => (
          <Box key={index}>
            <Card
              className={"flex justify-center items-center"}
              sx={{ width: 100, height: 100 }}
              onClick={() => handleClickOpen(player)}
              variant="outlined"
            >
              <CardContent
                className={`${
                  player.status === "Eliminated" ? "bg-black" : "bg-white"
                }`}
              >
                {player.name}
              </CardContent>
            </Card>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={() => {
            onNewGame();
            window.location.reload();
          }}
        >
          Next Round
        </Button>
        <ResetGame />
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message={message}
        onClose={handleClose}
        severity={severity}
      />
    </>
  );
};

export default GameVoting;
