import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#a3884b",
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });
  const [distanceRight, setDistanceRight] = useState();
  const [reload, setReload] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [expandMap, setExpandMap] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [latLng, setLatLng] = useState();
  const [layerGroup, setLayerGroup] = useState();
  const [currentPicture, setCurrentPicture] = useState();
  const [distance, setDistance] = useState();
  const [markerStore, setMarkerStore] = useState();
  const [clearMap, setClearMap] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
              refreshInterval: 30000,
            }}
          >
            <Component
              {...pageProps}
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
      </ThemeProvider>
    </>
  );
}

export default MyApp;
