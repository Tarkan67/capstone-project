import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Map from "../components/Map";

import styles from "../styles/Home.module.css";
import locations from "../db/location";
import randomInteger from "random-int";
import LoginButton from "../components/LoginButton/LoginButton";
import { getSession } from "next-auth/react";

const MapEffect = ({ useMap }) => {
  const map = useMap();

  useEffect(() => {
    console.log("map", { map });
  }, [map]);

  return null;
};
export default function Home({
  currentPicture,
  setCurrentPicture,
  distance,
  setDistance,
  markerStore,
  setMarkerStore,
  clearMap,
  setClearMap,
  checkAnswer,
  setCheckAnswer,
}) {
  const myRefMap = useRef(null);
  const executeScrollToMap = () => myRefMap.current.scrollIntoView();
  const myRefTop = useRef(null);
  const executeScrollToTop = () => myRefTop.current.scrollIntoView();

  const [distanceRight, setDistanceRight] = useState();

  function handleSubmit() {
    if (distance < 500) {
      setDistanceRight(1);
    } else if (distance === undefined) {
      setDistanceRight(3);
    } else {
      setDistanceRight(2);
    }
  }

  function handleNextMap() {
    setDistanceRight(undefined);
    executeScrollToTop();
    setCurrentPicture(locations[randomInteger(4)]);
    setClearMap(true);
  }

  function handleCheckAnswer() {
    if (markerStore) {
      setCheckAnswer(true);
    } else {
      setCheckAnswer(false);
    }
  }

  return (
    <div className={styles.relativeBox}>
      <LoginButton />
      {distanceRight ? (
        <>
          <button className={styles.bottomBtn} onClick={handleNextMap}>
            Next Map
          </button>
          <button className={styles.topBtn} onClick={handleCheckAnswer}>
            Check Answer
          </button>
        </>
      ) : (
        <>
          <button className={styles.topBtn} onClick={executeScrollToTop}>
            Top
          </button>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Submit
          </button>
          <button className={styles.bottomBtn} onClick={executeScrollToMap}>
            Map
          </button>
        </>
      )}
      {distanceRight === 1 ? (
        <>
          <div className={styles.rightDiv}> You are Right</div>
        </>
      ) : distanceRight === 2 ? (
        <div className={styles.wrongDiv}> You are Wrong</div>
      ) : distanceRight === 3 ? (
        <div className={styles.noinputDiv}>
          Set a Marker on the map before you Submit
        </div>
      ) : null}

      <Head>
        <title>Elden Guesser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div ref={myRefTop}>
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
      <div ref={myRefMap}>
        <Map
          checkAnswer={checkAnswer}
          setCheckAnswer={setCheckAnswer}
          markerStore={markerStore}
          setMarkerStore={setMarkerStore}
          distance={distance}
          setDistance={setDistance}
          currentPicture={currentPicture}
          setCurrentPicture={setCurrentPicture}
          clearMap={clearMap}
          setClearMap={setClearMap}
          className={styles.homeMap}
          center={[40.5, 100.5]}
          zoom={3}
        >
          {(
            { TileLayer, Marker, Popup, useMap, ImageOverlay, Polyline },
            map,
            rc,
            latLng,
            distance
          ) => (
            <>
              <MapEffect useMap={useMap} />
              <TileLayer
                url="/tiles/{z}/{x}/{y}.png"
                noWrap
                bounds={rc.getMaxBounds()}
                maxNativeZoom={rc.zoomLevel()}
              />
            </>
          )}
        </Map>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
