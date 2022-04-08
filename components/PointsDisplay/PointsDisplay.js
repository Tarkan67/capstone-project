import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Player from "../../schema/Player";
import styles from "./PointsDisplay.module.css";

export default function PointsDisplay({ player, setPlayer }) {
  // const [player, setPlayer] = useState();
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("/api/player");
        let playerData = await response.json();
        const find = playerData.find(
          (player) => player.playerId === session.user.id
        );
        setPlayer(find);
        console.log(find);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPlayers();
  }, []);
  console.log(player ? player.points : null);
  const { data: session } = useSession();
  if (session) {
    <Button variant="contained" className={styles.PointsDisplay}>
      {player ? player.points : "no logged in"}
    </Button>;
  }
  return (
    <Button variant="contained" className={styles.PointsDisplay}>
      {player ? player.points : "not logged in"}
    </Button>
  );
}
