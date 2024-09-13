import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const PlayerList = ({
  players,
  currentWord,
  revealedPlayers,
  revealForPlayer,
  navigateToVoting,
}) => {
  const getPlayerWord = (player) => {
    if (player.role === "spy") return "Mr. White";
    return currentWord;
  };

  const allPlayersRevealed = revealedPlayers.length === players.length;

  useEffect(() => {
    if (allPlayersRevealed) {
      console.log("All players have revealed their cards");
    }
  }, [allPlayersRevealed]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Click on a player to reveal their word
      </h2>
      <div className="flex flex-wrap justify-center">
        {players.map((player) => (
          <div key={player.name} className="m-4">
            {revealedPlayers.includes(player.name) ? (
              <div className="text-xl">
                {player.name}: {getPlayerWord(player)}
              </div>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => revealForPlayer(player.name)}
              >
                {player.name}
              </Button>
            )}
          </div>
        ))}
      </div>

      {allPlayersRevealed && (
        <Button
          variant="contained"
          color="secondary"
          className="mt-6"
          onClick={navigateToVoting}
        >
          Proceed to Voting
        </Button>
      )}
    </div>
  );
};

export default PlayerList;
