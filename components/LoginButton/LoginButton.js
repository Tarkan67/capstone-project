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
        <button
          onClick={() => signOut()}
          style={{ backgroundColor: "lightgray" }}
        >
          Sign out
        </button>
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
      <span>Not signed in</span>
      <button onClick={() => signIn()} style={{ backgroundColor: "lightgray" }}>
        Sign in
      </button>
    </div>
  );
}
