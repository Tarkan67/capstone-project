import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ResponsiveAppBar from "../components/AppBar/ResponsiveAppBar";
import ActionAreaCard from "../components/GameCard/ActionAreaCard";

export default function Home({ setSubmitCount, setReload }) {
  const router = useRouter();
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
      <div className={styles.flexCardContainer}>
        <ActionAreaCard
          path="/level_1"
          title="LIMGRAVE"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650309090/Location_2-fixed_u8icb9.jpg"
        />
        <ActionAreaCard
          path="/level_2"
          title="WEEPING PENINSULA"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650608331/Limgrave/Video_3_stitch_ncbvek.jpg"
        />
        <ActionAreaCard
          path="/level_3"
          title="LIURNIA"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650608934/Limgrave/Video_4_stitch_qi8ixk.jpg"
        />
      </div>
      <div className={styles.flexCardContainer}>
        <ActionAreaCard
          path="/level_3"
          title="CAELID"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650609695/Limgrave/Video_5_stitch_auf1qq.jpg"
        />
        <ActionAreaCard
          path="/level_3"
          title="ALTUS PLATEAU"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650606952/Limgrave/Video_1_stitch_j6rct4.jpg"
        />
        <ActionAreaCard
          path="/level_3"
          title="MT. GELMIR"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650607780/Limgrave/Video_2_stitch_odchjo.jpg"
        />
      </div>
      <div className={styles.flexCardContainer}>
        <ActionAreaCard
          path="/level_3"
          title="CAELID"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650411812/Location_HD_znrrwh.jpg"
        />
        <ActionAreaCard
          path="/level_3"
          title="ALTUS PLATEAU"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650609695/Limgrave/Video_5_stitch_auf1qq.jpg"
        />
        <ActionAreaCard
          path="/level_3"
          title="MT. GELMIR"
          imageSrc="https://res.cloudinary.com/dbqtg5phf/image/upload/v1650608934/Limgrave/Video_4_stitch_qi8ixk.jpg"
        />
      </div>
    </main>
  );
}
