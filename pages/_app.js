import { SessionProvider } from "next-auth/react";
import randomInteger from "random-int";
import { useState, useEffect } from "react";
import { SWRConfig } from "swr";
import locations from "../db/location";
import "../styles/globals.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
// import * as ReactLeaflet from "react-leaflet";

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
  const [expandMap, setExpandMap] = useState({ height: "30vh", width: "30vw" });
  const [clickCount, setClickCount] = useState(0);
  const [latLng, setLatLng] = useState();
  const [layerGroup, setLayerGroup] = useState();
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
      <ThemeProvider theme={theme}>
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
