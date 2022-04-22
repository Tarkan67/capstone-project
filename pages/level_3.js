import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Map from "../components/Map";
import { motion } from "framer-motion";
import PushPinIcon from "@mui/icons-material/PushPin";
import styles from "../styles/Game.module.css";
import locations from "../db/level_3";
import { getSession, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import {
  Alert,
  ButtonGroup,
  Collapse,
  IconButton,
  Tooltip,
} from "@mui/material";
import PointsDisplay from "../components/PointsDisplay/PointsDisplay";
import useSWR from "swr";
import { useRouter } from "next/router";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const MapEffect = ({ useMap }) => {
  const map = useMap();
  return null;
};
export default function Game({
  submitCount,
  setSubmitCount,
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
  clickCount,
  setClickCount,
  latLng,
  setLatLng,
  layerGroup,
  setLayerGroup,
  expandMap,
  setExpandMap,
  pinned,
  setPinned,
  animation,
  setAnimation,
  reload,
  setReload,
  distanceRight,
  setDistanceRight,
}) {
  const [open, setOpen] = useState(true);
  const { data: session } = useSession();

  function handleSubmit() {
    if (distance < 1000) {
      setDistanceRight(1);
      handlePoints();
    } else if (distance === undefined) {
      setDistanceRight(3);
      setOpen(true);
    } else {
      setDistanceRight(2);
    }
  }

  const { mutate, data: user } = useSWR(`/api/user/${session?.user.id}`, {
    isPaused: () => !session?.user.id,
  });

  function handlePoints() {
    mutate(
      async () => {
        const response = await fetch(`/api/user/${session?.user.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            $inc: {
              points: Math.round(1000 * (1 / (distance ^ 0.9))),
            },
          }),
        });
        const data = await response.json();
        console.log("data", data);
      },
      {
        optimisticData: {
          ...user,
          points: user?.points + Math.round(1000 * (1 / (distance ^ 0.9))),
        },
      }
    );
  }

  const router = useRouter();

  function reloadPage() {
    setReload(false);
  }

  function routerLandingPage() {
    router.push("/");
  }

  function handleNextPicture() {
    if (currentPicture.id === 5) {
      routerLandingPage();
    }
    setDistanceRight(undefined);
    setSubmitCount(submitCount + 1);
    setClearMap(true);
    setExpandMap(false);
    setAnimation(false);
  }
  useEffect(() => {
    setCurrentPicture(locations[submitCount]);
  }, [submitCount]);

  useEffect(() => {
    setCurrentPicture(locations[submitCount]);
    if (reload) {
      reloadPage();
      router.reload();
    }
  }, []);

  function handleCheckAnswer() {
    if (markerStore) {
      setCheckAnswer(true);
    } else {
      setCheckAnswer(false);
    }
  }

  function handlePinButton() {
    setPinned(!pinned);
  }

  function handleImageClick() {
    setExpandMap(false);
    setAnimation(false);
  }

  const constraintsRef = useRef(null);

  return (
    <>
      <div className={styles.mainFlexContainer}>
        <div className={styles.LeaderBoardButtonFlexContainer}>
          <PointsDisplay currentPicture={currentPicture} />
        </div>
      </div>
      <div className={styles.mainFlexContainerSecond}>
        {distanceRight == 1 || distanceRight == 2 ? (
          <>
            <ButtonGroup
              className={styles.buttonGroup}
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Tooltip title="Right answer will be shown">
                <Button
                  variant="contained"
                  onClick={handleCheckAnswer}
                  className={styles.button}
                >
                  Check Answer
                </Button>
              </Tooltip>
              <Tooltip title="Next Picture">
                <Button
                  variant="contained"
                  onClick={handleNextPicture}
                  className={styles.button}
                >
                  Next Picture
                </Button>
              </Tooltip>
            </ButtonGroup>
          </>
        ) : (
          <>
            <ButtonGroup
              className={styles.buttonGroupSubmit}
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Tooltip title="Submit your Answer">
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  className={styles.button}
                >
                  Submit
                </Button>
              </Tooltip>
            </ButtonGroup>
          </>
        )}
      </div>
      {distanceRight === 1 ? (
        <>
          <Alert className={styles.alertBox} severity="success">
            You are {Math.round(distance)} meters away! You got{" "}
            {Math.round(1000 * (1 / (distance ^ 0.9)))} Points
          </Alert>
        </>
      ) : distanceRight === 2 ? (
        <>
          <Alert className={styles.alertBox} severity="error">
            Sorry! You are {Math.round(distance)} meters away, not in range for
            points
          </Alert>
        </>
      ) : distanceRight === 3 ? (
        <>
          <Collapse in={open}>
            <Alert
              severity="info"
              className={styles.alertBox}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  X
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Set a marker, before submitting!
            </Alert>
          </Collapse>
        </>
      ) : null}

      <Head>
        <title>Elden Guesser</title>
      </Head>
      <div className={styles.imageContainer} ref={constraintsRef}>
        <motion.div drag="x" dragConstraints={constraintsRef} dragElastic={0.1}>
          <div className={styles.imageWrapper}>
            {currentPicture ? (
              <Image
                onClick={handleImageClick}
                src={currentPicture.path}
                alt="First Picture"
                layout="fill"
                objectFit="cover"
                draggable="false"
                className={styles.image}
              />
            ) : null}
          </div>
        </motion.div>
      </div>
      {animation || pinned ? (
        pinned ? (
          <PushPinIcon className={styles.pinButton} onClick={handlePinButton} />
        ) : (
          <PushPinOutlinedIcon
            className={styles.pinButton}
            onClick={handlePinButton}
          />
        )
      ) : null}
      <div>
        <Map
          distanceRight={distanceRight}
          setDistanceRight={setDistanceRight}
          reload={reload}
          setReload={setReload}
          submitCount={submitCount}
          setSubmitCount={setSubmitCount}
          animation={animation}
          setAnimation={setAnimation}
          pinned={pinned}
          setPinned={setPinned}
          expandMap={expandMap}
          setExpandMap={setExpandMap}
          clickCount={clickCount}
          setClickCount={setClickCount}
          latLng={latLng}
          setLatLng={setLatLng}
          layerGroup={layerGroup}
          setLayerGroup={setLayerGroup}
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
    </>
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
