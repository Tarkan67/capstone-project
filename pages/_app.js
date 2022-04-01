import { SessionProvider } from "next-auth/react";
import randomInteger from "random-int";
import { useState, useEffect } from "react";
import { SWRConfig } from "swr";
import locations from "../db/location";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [currentPicture, setCurrentPicture] = useState();
  const [distance, setDistance] = useState();
  const [markerStore, setMarkerStore] = useState();
  const [clearMap, setClearMap] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  useEffect(() => {
    setCurrentPicture(locations[randomInteger(4)]);
  }, []);
  return (
    <>
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
            refreshInterval: 3000,
          }}
        >
          <Component
            {...pageProps}
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
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

export default MyApp;
