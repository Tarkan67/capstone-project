import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Map from "../components/Map";

import styles from "../styles/Home.module.css";
import locations from "../db/location";
import randomInteger from "random-int";
import LoginButton from "../components/LoginButton/LoginButton";
import { getSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { Alert, AlertTitle, ButtonGroup, Tooltip } from "@mui/material";

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
          <ButtonGroup
            className={styles.buttonGroup}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Tooltip title="Right answer will be shown.">
              <Button variant="contained" onClick={handleCheckAnswer}>
                Check Answer
              </Button>
            </Tooltip>
            <Tooltip title="Next Picture">
              <Button variant="contained" onClick={handleNextMap}>
                Next Map
              </Button>
            </Tooltip>
          </ButtonGroup>
        </>
      ) : (
        <>
          <ButtonGroup
            className={styles.buttonGroup}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Tooltip title="Back to the picture">
              <Button variant="contained" onClick={executeScrollToTop}>
                Picture
              </Button>
            </Tooltip>
            <Tooltip title="Submit your Answer">
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Tooltip>
            <Tooltip title="Show Map">
              <Button variant="contained" onClick={executeScrollToMap}>
                Map
              </Button>
            </Tooltip>
          </ButtonGroup>
        </>
      )}
      {distanceRight === 1 ? (
        <>
          <Alert className={styles.alertBox} severity="success">
            You are Right!
          </Alert>
        </>
      ) : distanceRight === 2 ? (
        <>
          <Alert className={styles.alertBox} severity="error">
            Sorry! You are not in range.
          </Alert>
        </>
      ) : distanceRight === 3 ? (
        <>
          <AlertTitle>
            <Alert className={styles.alertBox} severity="info">
              Set a Marker on the map before you Submit
            </Alert>
          </AlertTitle>
        </>
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
