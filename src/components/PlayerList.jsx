// src/components/PlayerList.js
import { useState } from "react";
import { Button, TextField, List, ListItem } from "@mui/material";
import styled from "styled-components";

const PlayerList = ({ onStartGame }) => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");

  const addPlayer = () => {
    if (!playerName) {
      setError("Player name cannot be empty");
      return;
    }

    if (
      players.some(
        (player) => player.name.toLowerCase() === playerName.toLowerCase()
      )
    ) {
      setError("Player name already exists");
      return;
    }

    setPlayers([...players, { name: playerName }]);
    setPlayerName("");
    setError(""); // Clear error after successful addition
  };

  const startGame = () => {
    if (players.length >= 3) {
      onStartGame(players);
    } else {
      alert("You need at least 3 players to start the game.");
    }
  };

  return (
    <div className="w-full">
      <TextField
        className="w-full"
        label="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        error={Boolean(error)}
        helperText={error}
      />
      <Button onClick={addPlayer} variant="contained" color="primary">
        Add Player
      </Button>
      <List>
        {players.map((player, index) => (
          <ListItem key={index}>{player.name}</ListItem>
        ))}
      </List>
      <Button onClick={startGame} variant="contained" color="secondary">
        Start Game
      </Button>
    </div>
  );
};

export default PlayerList;
