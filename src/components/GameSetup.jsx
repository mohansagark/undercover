import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const GameSetup = ({ initializePlayers }) => {
  const [civilians, setCivilians] = useState(0);
  const [spies, setSpies] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  const [isNameEntry, setIsNameEntry] = useState(false);

  const handlePlayerNumberSubmit = () => {
    const totalPlayers = parseInt(civilians) + parseInt(spies);
    setPlayerNames(Array(totalPlayers).fill(""));
    setIsNameEntry(true);
  };

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleGameStart = () => {
    initializePlayers({
      civilians: parseInt(civilians),
      spies: parseInt(spies),
      playerNames,
    });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {!isNameEntry ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Enter Number of Civilians and Spies
          </h1>
          <TextField
            label="Number of Civilians"
            type="number"
            variant="outlined"
            value={civilians}
            onChange={(e) => setCivilians(e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Number of Spies"
            type="number"
            variant="outlined"
            value={spies}
            onChange={(e) => setSpies(e.target.value)}
            className="mb-4"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlayerNumberSubmit}
          >
            Next
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Enter Player Names</h1>
          {playerNames.map((name, index) => (
            <TextField
              key={index}
              label={`Player ${index + 1}`}
              variant="outlined"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="mb-4"
            />
          ))}
          <Button variant="contained" color="primary" onClick={handleGameStart}>
            Start Game
          </Button>
        </>
      )}
    </div>
  );
};

export default GameSetup;
