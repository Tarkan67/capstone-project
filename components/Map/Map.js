import { useEffect, useState } from "react";
import L from "leaflet";
import { CRS } from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
import rastercoords from "leaflet-rastercoords";
import Icon from "../Icon/Icon";
import styles from "./Map.module.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const { MapContainer, MapConsumer } = ReactLeaflet;
const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }
  console.log(rest);
  // Fix for issue between next js and react leaflet, without it no markers will show up on the map
  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer
      className={mapClassName}
      {...rest}
      CRS={CRS.Simple}
      bounds={[
        [0, 0],
        [8192, 8192],
      ]}
      fitBounds={[
        [0, 0],
        [8192, 8192],
      ]}
    >
      <MapConsumer>
        {(map) => {
          const marker = map.on("click", function (e) {
            const { lat, lng } = e.latlng;
            L.marker([lat, lng], { Icon }).addTo(map);
          });
          console.log("map.on", marker);
          const rc = new rastercoords(map, [11011, 11716]);
          map.setMaxZoom(rc.zoomLevel());
          map.setView(rc.unproject([11011, 11716]), 2);
          return children(ReactLeaflet, map, rc);
        }}
      </MapConsumer>
    </MapContainer>
  );
};

export default Map;
