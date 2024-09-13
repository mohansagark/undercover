import React, { useState } from "react";
import { Button } from "@mui/material";

const CardReveal = ({ currentPlayer, currentWord, revealNextPlayer }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold">Player: {currentPlayer.name}</h2>
      {!isRevealed ? (
        <Button variant="contained" color="primary" onClick={handleReveal}>
          Reveal Secret Word
        </Button>
      ) : (
        <div className="mt-4 text-xl">
          {currentPlayer.role === "spy" ? "Mr. White" : currentWord}
        </div>
      )}
      {isRevealed && (
        <Button
          variant="contained"
          color="secondary"
          className="mt-4"
          onClick={revealNextPlayer}
        >
          Next Player
        </Button>
      )}
    </div>
  );
};

export default CardReveal;
