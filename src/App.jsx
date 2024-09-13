import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

import PlayerCount from "./components/PlayerCount";
import GameSession from "./components/GameSession";
import GameVoting from "./components/GameVoting";

import "./App.css";

const App = () => {
  const [existingSession, setExistingSession] = useLocalStorage(
    "existingSession",
    false
  );
  const [storedPlayers, setStoredPlayers] = useLocalStorage(
    "storedPlayers",
    []
  );
  const [gameState, setGameState] = useState("setup");
  const [players, setPlayers] = useState(storedPlayers ?? []);

  useEffect(() => {
    if (existingSession) setGameState("session");
  }, []);

  useEffect(() => {
    setStoredPlayers(players);
  }, [players]);

  const startGame = (plr) => {
    setGameState("session");

    const players = [];

    for (let i = 0; i < plr.spyCount; i++) {
      players.push({
        id: Math.random().toString(36).substr(2, 9), // unique id
        role: "spy",
        name: "",
        status: "Active",
      });
    }

    for (let i = 0; i < plr.civilianCount; i++) {
      players.push({
        id: Math.random().toString(36).substr(2, 9),
        role: "civilian",
        name: "",
        status: "Active",
      });
    }

    const shuffledPlayers = players.sort(() => Math.random() - 0.5);
    setPlayers(shuffledPlayers);
    console.log(shuffledPlayers);
  };

  const addPlayers = (player) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((p) =>
        p.id === player.id ? { ...p, name: player.name } : p
      );
    });
  };

  const updatePlayerStatus = (player) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((p) =>
        p.id === player.id ? { ...p, status: "Revealed" } : p
      );
    });
  };

  const eliminatePlayers = (player) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((p) =>
        p.id === player.id ? { ...p, status: "Eliminated" } : p
      );
    });
  };

  const gotoVotingPage = () => {
    setGameState("vote");
  };

  const onNewGame = () => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => ({ ...player, status: "Active" }));
    });
  };

  return (
    <div className="App w-full">
      {gameState === "setup" && <PlayerCount onGamStart={startGame} />}
      {gameState === "session" && (
        <GameSession
          players={players}
          addPlayers={addPlayers}
          gotoVotingPage={gotoVotingPage}
          updatePlayerStatus={updatePlayerStatus}
        />
      )}
      {gameState === "vote" && (
        <GameVoting
          players={players}
          eliminatePlayers={eliminatePlayers}
          onNewGame={onNewGame}
        />
      )}
    </div>
  );
};

export default App;
