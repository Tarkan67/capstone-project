import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styles from "./PointsDisplay.module.css";

export default function PointsDisplay({ currentPicture }) {
  const { data: session } = useSession();

  const { data: user } = useSWR(`/api/user/${session?.user.id}`, {
    isPaused: () => !session?.user.id,
  });
  return (
    <Button variant="contained" className={styles.PointsDisplay}>
      {currentPicture ? `${currentPicture.id} / 5` : "not logged in"}
    </Button>
  );
}
