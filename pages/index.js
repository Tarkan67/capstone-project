import Head from "next/head";
import { useEffect, useState, useRef, createContext, useContext } from "react";
import Image from "next/image";

import Map from "../components/Map";

import styles from "../styles/Home.module.css";
import locations from "../db/location";
import randomInteger from "random-int";
import { getDistance } from "geolib";

const MapEffect = ({ useMap }) => {
  const map = useMap();

  useEffect(() => {
    console.log("map", { map });
  }, [map]);

  return null;
};

export default function Home({ currentPicture }) {
  const myRefMap = useRef(null);
  const executeScrollToMap = () => myRefMap.current.scrollIntoView();
  const myRefTop = useRef(null);
  const executeScrollToTop = () => myRefTop.current.scrollIntoView();
  const UserContext = createContext();
  function handleSubmit() {
    const distance = useContext(UserContext);
    console.log(distance);
  }
  return (
    <div className={styles.relativeBox}>
      <button className={styles.topBtn} onClick={executeScrollToTop}>
        Top
      </button>
      <button className={styles.submitBtn} onClick={handleSubmit}>
        Submit
      </button>
      <button className={styles.bottomBtn} onClick={executeScrollToMap}>
        Map
      </button>

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
          currentPicture={currentPicture}
          className={styles.homeMap}
          center={[40.5, 100.5]}
          zoom={3}
          bounds={[
            [0, 0],
            [50.5, 30.5],
          ]}
          fitBounds={[
            [0, 0],
            [50.5, 30.5],
          ]}
        >
          {(
            { TileLayer, Marker, Popup, useMap, ImageOverlay },
            map,
            rc,
            latLng,
            distance
          ) => (
            <>
              <UserContext.Provider value={distance}>
                <MapEffect useMap={useMap} />
                <TileLayer
                  url="/tiles/{z}/{x}/{y}.png"
                  noWrap
                  bounds={rc.getMaxBounds()}
                  maxNativeZoom={rc.zoomLevel()}
                />
              </UserContext.Provider>
            </>
          )}
        </Map>
      </div>
    </div>
  );
}
