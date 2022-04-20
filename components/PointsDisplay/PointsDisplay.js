import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styles from "./PointsDisplay.module.css";

export default function PointsDisplay({ currentPicture }) {
  const { data: session } = useSession();
  console.log("points display", currentPicture);

  const { data: user } = useSWR(`/api/user/${session?.user.id}`, {
    isPaused: () => !session?.user.id,
  });

  // if (session) {
  //   <Button variant="contained" className={styles.PointsDisplay}>
  //     {currentPicture ? currentPicture.id : "not logged in"}
  //   </Button>;
  // }
  return (
    <Button variant="contained" className={styles.PointsDisplay}>
      {currentPicture ? `${currentPicture.id} / 5` : "not logged in"}
    </Button>
  );
}
