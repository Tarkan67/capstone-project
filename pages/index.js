import Head from "next/head";
import styles from "../styles/Home.module.css";
import LoginButton from "../components/LoginButton/LoginButton";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ setSubmitCount, setReload }) {
  const router = useRouter();
  useEffect(() => {
    function handleKeyPress() {
      router.push("/game");
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    setReload(true);
    setSubmitCount(0);
  }, []);
  return (
    <Link href="/level_1">
      <div className={styles.indexFlexContainer}>
        <LoginButton />
        <Head>
          <title>Elden Guesser</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <video autoPlay loop muted className={styles.video} id="video">
          <source
            src="https://res.cloudinary.com/dbqtg5phf/video/upload/v1649319479/Untitled_dorpsq.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </Link>
  );
}
