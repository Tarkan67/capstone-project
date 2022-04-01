import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignIn({ providers }) {
  // you can use a hook like this to redirect the user after the login:
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>Sign In 🚀</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            style={{ backgroundColor: "lightgray" }}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession();
  return {
    props: { providers },
  };
}
