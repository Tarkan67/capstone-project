import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styles from "./PointsDisplay.module.css";

export default function PointsDisplay({ player, setPlayer }) {
  const { data: session } = useSession();

  const { data: user } = useSWR(`/api/user/${session?.user.id}`, {
    isPaused: () => !session?.user.id,
  });

  if (session) {
    <Button variant="contained" className={styles.PointsDisplay}>
      {user ? user.points : "no logged in"}
    </Button>;
  }
  return (
    <Button variant="contained" className={styles.PointsDisplay}>
      {user ? user.points : "not logged in"}
    </Button>
  );
}
