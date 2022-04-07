import Head from "next/head";
import styles from "../styles/Home.module.css";
import LoginButton from "../components/LoginButton/LoginButton";
import Link from "next/link";

export default function Home({ currentPicture }) {
  return (
    <Link href="/game" className={styles.mainGridContainer}>
      <div className={styles.mainGridContainer}>
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
