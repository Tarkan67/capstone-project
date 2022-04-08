import { Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import ProfileOverlay from "../ProfileOverlay/ProfileOverlay";
import styles from "./LoginButton.module.css";

export default function LoginButton({ player, setPlayer }) {
  const { data: session } = useSession();

  if (session)
    useEffect(() => {
      async function handleLogIn() {
        // fetch
        const response = await fetch("/api/player", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            playerId: session.user.id,
            points: 0,
          }),
        });
        const createdPlayer = await response.json();
        if (response.ok) {
          alert(`Player Created`);
        } else {
          alert(`Ooops — ${createdPlayer.error}`);
        }
      }
      handleLogIn();
    }, []);
  function handlePlayer() {
    setPlayer(true);
  }
  function handleSetPlayer() {}
  if (session) {
    if (player === undefined) {
      handlePlayer();
    }
    return <ProfileOverlay></ProfileOverlay>;
  }
  return (
    <Button
      variant="contained"
      onClick={() => signIn()}
      className={styles.loginButton}
    >
      Sign in
    </Button>
  );
}
