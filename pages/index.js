import Head from "next/head";
import styles from "../styles/Home.module.css";
import LoginButton from "../components/LoginButton/LoginButton";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ResponsiveAppBar from "../components/AppBar/ResponsiveAppBar";

export default function Home({ setSubmitCount, setReload }) {
  const router = useRouter();
  // useEffect(() => {
  //   function handleKeyPress() {
  //     router.push("/game");
  //   }
  //   window.addEventListener("keydown", handleKeyPress);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  useEffect(() => {
    setReload(true);
    setSubmitCount(0);
  }, []);
  return (
    <main className={styles.mainContainer}>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Head>
        <title>Elden Guesser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </main>
  );
}
