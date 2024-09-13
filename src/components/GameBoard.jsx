// src/components/GameBoard.js
import { useEffect, useState } from "react";
import { words } from "../constants/words";
import { Button, List, ListItem } from "@mui/material";

const GameBoard = ({ players }) => {
  const [assignedWords, setAssignedWords] = useState([]);

  useEffect(() => {
    // Randomly assign words to players
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

    const assigned = shuffledPlayers.map((player, index) => ({
      name: player.name,
      role: index === shuffledPlayers.length - 1 ? "Mr. White" : "Civilian",
      word:
        index === shuffledPlayers.length - 1
          ? randomWord.mrWhiteWord
          : randomWord.civilianWord,
    }));

    setAssignedWords(assigned);
  }, [players]);

  return (
    <div>
      <List>
        {assignedWords.map((player, index) => (
          <ListItem key={index}>
            {player.name} ({player.role}) - {player.word}
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary">
        End Game
      </Button>
    </div>
  );
};

export default GameBoard;
