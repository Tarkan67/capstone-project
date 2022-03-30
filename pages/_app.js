import randomInteger from "random-int";
import { useState, useEffect } from "react";
import locations from "../db/location";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [currentPicture, setCurrentPicture] = useState();
  useEffect(() => {
    setCurrentPicture(locations[randomInteger(4)]);
  }, []);
  return <Component {...pageProps} currentPicture={currentPicture} />;
}

export default MyApp;
