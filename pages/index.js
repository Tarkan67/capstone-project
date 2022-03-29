import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import { useRef } from "react";

import Map from "../components/Map";

import styles from "../styles/Home.module.css";
import locations from "../db/location";
import randomInteger from "random-int";

const MapEffect = ({ useMap }) => {
  const map = useMap();

  useEffect(() => {
    console.log("map", { map });
  }, [map]);

  return null;
};

export default function Home() {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <div className={styles.relativeBox}>
      <button className={styles.topBtn} onClick={executeScroll}>
        Top
      </button>
      <button className={styles.submitBtn}>Submit</button>
      <button className={styles.bottomBtn}>Bottom</button>

      <Head>
        <title>Elden Guesser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={locations[randomInteger(4)].path}
        alt="First Picture"
        width="2160"
        height="1215"
        className={styles.overlay}
        ref={myRef}
      />

      <Map
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
        {({ TileLayer, Marker, Popup, useMap, ImageOverlay }, map, rc) => (
          <>
            <MapEffect useMap={useMap} />
            <TileLayer
              url="/tiles/{z}/{x}/{y}.png"
              noWrap
              bounds={rc.getMaxBounds()}
              maxNativeZoom={rc.zoomLevel()}
            />
            <Marker position={[40, 100]}>
              <Popup>
                <Image
                  src="/location.png"
                  alt="Picture of location"
                  layout="fill"
                />
              </Popup>
            </Marker>
          </>
        )}
      </Map>
    </div>
  );
}
