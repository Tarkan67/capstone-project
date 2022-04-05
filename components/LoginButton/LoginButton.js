import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../styles/Home.module.css";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* <span>Signed in as {session.user.name}</span> */}
        <Button onClick={() => signOut()} className={styles.loginContainer}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <div>
      <Button onClick={() => signIn()} className={styles.loginContainer}>
        Sign in
      </Button>
    </div>
  );
}
