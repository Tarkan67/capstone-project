import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <span>Signed in as {session.user.name}</span>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
