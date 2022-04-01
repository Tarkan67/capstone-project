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
import { getDistance } from "geolib";

const { MapContainer, MapConsumer } = ReactLeaflet;
const Map = ({
  children,
  className,
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
  ...rest
}) => {
  let mapClassName = styles.map;
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }
  console.log("map currentPicture");
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
    <MapContainer className={mapClassName} {...rest} CRS={CRS.Simple}>
      <MapConsumer>
        {(map) => {
          const [clickCount, setClickCount] = useState(0);
          const [latLng, setLatLng] = useState();
          const [layerGroup, setLayerGroup] = useState(
            L.layerGroup().addTo(map)
          );
          ReactLeaflet.useMapEvents({
            click: (e) => {
              setLatLng(e.latlng);
              setDistance(
                latLng
                  ? getDistance(latLng, currentPicture.LatLng, 100) / 100
                  : null
              );
              const { lat, lng } = e.latlng;
              if (clickCount === 0) {
                setClickCount(clickCount + 1);
                markerStore ? map.removeLayer(markerStore) : null;
                setMarkerStore(
                  L.marker([lat, lng], { Icon }).addTo(layerGroup)
                );
              } else if (clickCount === 1) {
                setClickCount(clickCount - 1);
                markerStore ? map.removeLayer(markerStore) : null;
                setMarkerStore(
                  L.marker([lat, lng], { Icon }).addTo(layerGroup)
                );
              }
            },
          });

          if (checkAnswer && markerStore) {
            console.log(markerStore);
            L.polyline(
              [
                [currentPicture.LatLng.lat, currentPicture.LatLng.lng],
                [markerStore._latlng.lat, markerStore._latlng.lng],
              ],
              { color: "red" }
            ).addTo(layerGroup);
            setCheckAnswer(false);
          } else {
            null;
          }

          if (clearMap && markerStore) {
            layerGroup.clearLayers() &
              setMarkerStore() &
              setDistance() &
              setClearMap(false);
          } else {
            null;
          }
          const rc = new rastercoords(map, [11011, 11716]);
          map.setMaxZoom(rc.zoomLevel());
          return children(ReactLeaflet, map, rc, latLng, distance);
        }}
      </MapConsumer>
    </MapContainer>
  );
};

export default Map;
