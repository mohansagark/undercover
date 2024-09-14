import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import BoyIcon from "@mui/icons-material/Boy";
import GirlIcon from "@mui/icons-material/Girl";
import { words } from "../constants/words";
import useLocalStorage from "use-local-storage";
import ResetGame from "./ResetGame";

const GameSession = ({
  players,
  addPlayers,
  gotoVotingPage,
  updatePlayerStatus,
}) => {
  const [existingSession, setExistingSession] = useLocalStorage(
    "existingSession",
    false
  );
  const [openNameModal, setOpenNameModal] = useState(false);
  const [openWordModal, setOpenWordModal] = useState(false);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [allNamesEntered, setAllNamesEntered] = useState(false);
  const [revelead, setRevealed] = useState(0);
  const [activePlayer, setActivePlayer] = useState("");

  useEffect(() => {
    setRandomWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleClickOpen = (index) => {
    if (players[index].status !== "Revealed") {
      setSelectedPlayerIndex(index);
      setPlayerName(players[index]?.name || "");
      setError("");
      setActivePlayer(index);
      if (existingSession) {
        setOpenWordModal(true);
        setRevealed((prev) => prev + 1);
      } else {
        setOpenNameModal(true);
      } // Open the first modal to enter player name
    }
  };

  const handleCloseNameModal = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenNameModal(false);
    }
  };

  const handleCloseWordModal = () => {
    updatePlayerStatus(players[activePlayer]);
    setOpenWordModal(false);
  };

  const handleSaveName = () => {
    const trimmedName = playerName.trim();

    // Check for duplicate names
    const isDuplicate = players.some(
      (player, i) => player?.name === trimmedName && i !== selectedPlayerIndex
    );

    if (isDuplicate) {
      setError("This name is already taken. Please choose another.");
      return;
    }

    if (selectedPlayerIndex !== null && trimmedName !== "") {
      const updatedPlayers = [...players];
      updatedPlayers[selectedPlayerIndex].name = trimmedName;
      addPlayers(updatedPlayers); // Assuming `addPlayers` is a function to update the player list
    }
    const allNamesEntered = players.every((player) => player?.name !== "");
    setAllNamesEntered(allNamesEntered);
    if (allNamesEntered) {
      setExistingSession(allNamesEntered);
    }
    setOpenNameModal(false); // Close name modal
    setOpenWordModal(true); // Open word modal after saving name
  };

  const randomise = (index) =>
    index % 2 === 0 ? (
      <BoyIcon fontSize="large" />
    ) : (
      <GirlIcon fontSize="large" />
    );

  const getPlayerWordOrRole = (role) => {
    return role === "civilian" ? randomWord : "Mr. White";
  };

  return (
    <>
      <Box className="flex flex-wrap justify-between gap-4">
        {players.map((player, index) => (
          <Box className="rounded-full" key={index}>
            <Card
              className="flex justify-center items-center"
              sx={{ width: 100, height: 100 }}
              onClick={() => handleClickOpen(index)}
              variant="outlined"
            >
              <CardContent>
                {player?.name ? player.name : randomise(index)}
              </CardContent>
            </Card>
          </Box>
        ))}

        <Button
          className="w-full"
          variant="contained"
          disabled={!(allNamesEntered || revelead === players.length)}
          onClick={gotoVotingPage}
        >
          Vote
        </Button>
      </Box>
      <ResetGame />

      <Dialog
        open={!existingSession && openNameModal}
        onClose={handleCloseNameModal}
      >
        <DialogTitle>Enter Player Name</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Player Name"
            fullWidth
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            error={!!error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNameModal}>Cancel</Button>
          <Button onClick={handleSaveName}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Modal to display random word or role (civilian or spy) */}
      <Dialog open={openWordModal} onClose={handleCloseWordModal}>
        <DialogTitle>Role Information</DialogTitle>
        <DialogContent>
          {players[selectedPlayerIndex]?.role ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }}
            >
              <h3>{getPlayerWordOrRole(players[selectedPlayerIndex]?.role)}</h3>
            </Box>
          ) : (
            <Alert severity="warning">Role not assigned!</Alert>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameSession;
