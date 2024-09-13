import React, { useState } from "react";
import GameSetup from "./components/GameSetup";
import PlayerList from "./components/PlayerList";
import VotingScreen from "./components/VotingScreen";
import { words } from "./constants/words"; // Assuming you have a constant file with words

const App = () => {
  const [gameState, setGameState] = useState("setup"); // setup, reveal, vote
  const [players, setPlayers] = useState([]);
  const [currentWord, setCurrentWord] = useState(""); // Word for civilians
  const [revealedPlayers, setRevealedPlayers] = useState([]); // Track revealed players

  // Shuffle array function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Initialize players and start first round
  const initializePlayers = ({ civilians, spies, playerNames }) => {
    let allPlayers = [];
    for (let i = 0; i < civilians; i++) {
      allPlayers.push({ name: playerNames[i], role: "civilian" });
    }
    for (let i = civilians; i < civilians + spies; i++) {
      allPlayers.push({ name: playerNames[i], role: "spy" });
    }
    allPlayers = shuffleArray(allPlayers);
    setPlayers(allPlayers);
    startNewRound();
  };

  // Start a new round and generate a new word for civilians
  const startNewRound = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setRevealedPlayers([]); // Reset revealed players
    setGameState("reveal");
  };

  // Reveal word or "Mr. White" when a player is selected
  const revealForPlayer = (playerName) => {
    setRevealedPlayers([...revealedPlayers, playerName]);
  };

  // Handle navigation to voting screen
  const navigateToVoting = () => {
    setGameState("vote");
  };

  const handleVote = (votedPlayerName) => {
    const votedPlayer = players.find(
      (player) => player.name === votedPlayerName
    );
    if (votedPlayer.role === "spy") {
      setPlayers(players.filter((player) => player.name !== votedPlayerName));
      if (players.filter((player) => player.role === "spy").length === 1) {
        alert("Spies have been eliminated! Civilians win.");
        setGameState("setup");
      }
    } else {
      alert("A civilian was eliminated!");
    }
    startNewRound();
  };

  return (
    <div className="App">
      {gameState === "setup" && (
        <GameSetup initializePlayers={initializePlayers} />
      )}
      {gameState === "reveal" && (
        <PlayerList
          players={players}
          currentWord={currentWord}
          revealedPlayers={revealedPlayers}
          revealForPlayer={revealForPlayer}
          navigateToVoting={navigateToVoting}
        />
      )}
      {gameState === "vote" && (
        <VotingScreen players={players} onVote={handleVote} />
      )}
    </div>
  );
};

export default App;
