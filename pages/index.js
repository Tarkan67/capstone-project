import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import locations from "../db/location";
import randomInteger from "random-int";
import LoginButton from "../components/LoginButton/LoginButton";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home({ currentPicture }) {
  return (
    <div className={styles.relativeBox}>
      <LoginButton />
      <Head>
        <title>Elden Guesser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/game">
        <Button
          variant="contained"
          style={{
            position: "absolute",
            left: "45vw",
            top: "55vh",
            zIndex: 12,
          }}
        >
          Play the Game
        </Button>
      </Link>
      <Image
        src={
          currentPicture
            ? currentPicture.path
            : locations[randomInteger(4)].path
        }
        alt="First Picture"
        width="2160"
        height="1215"
        className={styles.overlay}
      />
    </div>
  );
}
