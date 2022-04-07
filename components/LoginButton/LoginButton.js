import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./LoginButton.module.css";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Button
        variant="contained"
        onClick={() => signOut()}
        className={styles.loginButton}
      >
        Sign out
      </Button>
    );
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
