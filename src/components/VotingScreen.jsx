import React, { useState } from "react";
import { Button } from "@mui/material";

const VotingScreen = ({ players, onVote }) => {
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const handleVote = () => {
    if (selectedPlayer) {
      onVote(selectedPlayer);
    } else {
      alert("Please select a player to vote.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Vote to eliminate a player</h2>
      <div className="flex flex-wrap justify-center">
        {players.map((player) => (
          <Button
            key={player.name}
            variant="contained"
            color={selectedPlayer === player.name ? "secondary" : "primary"}
            onClick={() => setSelectedPlayer(player.name)}
            className="m-2"
          >
            {player.name}
          </Button>
        ))}
      </div>
      <Button
        variant="contained"
        color="error"
        className="mt-6"
        onClick={handleVote}
      >
        Vote to Eliminate
      </Button>
    </div>
  );
};

export default VotingScreen;
