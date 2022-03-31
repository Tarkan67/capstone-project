import randomInteger from "random-int";
import { useState, useEffect } from "react";
import locations from "../db/location";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [currentPicture, setCurrentPicture] = useState();
  const [distance, setDistance] = useState();
  const [markerStore, setMarkerStore] = useState();
  const [polyGonStore, setPolyGonStore] = useState();
  const [clearMap, setClearMap] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  useEffect(() => {
    setCurrentPicture(locations[randomInteger(4)]);
  }, []);
  return (
    <Component
      {...pageProps}
      polyGonStore={polyGonStore}
      setPolyGonStore={setPolyGonStore}
      checkAnswer={checkAnswer}
      setCheckAnswer={setCheckAnswer}
      clearMap={clearMap}
      setClearMap={setClearMap}
      markerStore={markerStore}
      setMarkerStore={setMarkerStore}
      currentPicture={currentPicture}
      setCurrentPicture={setCurrentPicture}
      distance={distance}
      setDistance={setDistance}
    />
  );
}

export default MyApp;
