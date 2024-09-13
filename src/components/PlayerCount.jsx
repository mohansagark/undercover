import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import useLocalStorage from "use-local-storage";

const PlayerCount = ({ onGamStart }) => {
  const [civilianCount, setCivilianCount] = useState(2);
  const [spyCount, setSpyCount] = useState(1);
  const [playerCount, setPlayerCount] = useLocalStorage("playerCount", {});

  const handleCivilianCount = (e) => {
    e.preventDefault();
    setCivilianCount(e.target.value);
    setPlayerCount({ ...playerCount, civilians: e.target.value });
  };

  const handleSpyCount = (e) => {
    e.preventDefault();
    setSpyCount(e.target.value);
  };

  return (
    <div className="flex items-center justify-center flex-col gap-4 w-full">
      <TextField
        className="w-full"
        label="Enter number of Civilians"
        value={civilianCount}
        onChange={handleCivilianCount}
        type="number"
      />
      <TextField
        className="w-full"
        label="Enter number of Spy"
        value={spyCount}
        onChange={handleSpyCount}
        type="number"
      />
      <Button
        variant="contained"
        onClick={() => onGamStart({ civilianCount, spyCount })}
      >
        Start Game
      </Button>
    </div>
  );
};

export default PlayerCount;
