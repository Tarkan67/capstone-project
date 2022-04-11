import { Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import ProfileOverlay from "../ProfileOverlay/ProfileOverlay";
import styles from "./LoginButton.module.css";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
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
