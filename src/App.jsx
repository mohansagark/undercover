import useLocalStorage from "use-local-storage";
import PlayerList from "./components/PlayerList";
import PlayerCount from "./components/PlayerCount";
import "./App.css";

const App = () => {
  const [gameStarted, setGameStarted] = useLocalStorage("gameStarted", false);
  const [players, setPlayers] = useLocalStorage("players", []);

  const startGame = () => {
    setGameStarted(true);
  };

  const openGame = (playerList) => {
    setPlayers(playerList);
    setGameStarted(true);
  };

  return (
    <div className="w-full">
      {gameStarted ? (
        <PlayerList onStartGame={openGame} />
      ) : (
        <PlayerCount onGamStart={startGame} />
      )}
    </div>
  );
};

export default App;
