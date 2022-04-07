import { useEffect, useRef } from "react";
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
import { cx } from "@emotion/css";

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
  clickCount,
  setClickCount,
  latLng,
  setLatLng,
  layerGroup,
  setLayerGroup,
  expandMap,
  setExpandMap,
  ...rest
}) => {
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

  function MyComponent() {
    const map = ReactLeaflet.useMapEvents({
      click: (e) => {
        function handleAddMarker(marker) {
          setMarkerStore(marker);
        }
        function handleClickCount(value) {
          setClickCount(clickCount + value);
        }
        setLatLng(e.latlng);
        setDistance(
          latLng ? getDistance(latLng, currentPicture.LatLng, 100) / 100 : null
        );
        const { lat, lng } = e.latlng;
        if (clickCount === 0 && !checkAnswer) {
          handleClickCount(1);
          markerStore ? map.removeLayer(markerStore) : null;
          const marker = L.marker([lat, lng], { Icon }).addTo(layerGroup);
          handleAddMarker(marker);
        } else if (clickCount === 1 && !checkAnswer) {
          handleClickCount(-1);
          markerStore ? map.removeLayer(markerStore) : null;
          const marker = L.marker([lat, lng], { Icon }).addTo(layerGroup);
          handleAddMarker(marker);
        }
      },
    });
    return null;
  }
  const mapRef = useRef();

  useEffect(() => {
    console.log(mapRef.current, expandMap);
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [expandMap]);

  return (
    <div className={cx(styles.map, { [styles.mapExpanded]: expandMap })}>
      <MapContainer
        className={styles.mapContainer}
        {...rest}
        CRS={CRS.Simple}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <MyComponent />
        <MapConsumer>
          {(map) => {
            if (!layerGroup) {
              handleLayerGroup();
            }

            if (checkAnswer && markerStore) {
              L.polyline(
                [
                  [currentPicture.LatLng.lat, currentPicture.LatLng.lng],
                  [markerStore._latlng.lat, markerStore._latlng.lng],
                ],
                { color: "red" }
              ).addTo(layerGroup);
            } else {
              null;
            }
            function handleLayerGroup() {
              setLayerGroup(L.layerGroup().addTo(map));
            }
            function handleClearMap() {
              setMarkerStore();
              setDistance();
              setClearMap(false);
              setCheckAnswer(false);
            }

            if (clearMap && markerStore) {
              layerGroup.clearLayers();
              handleClearMap();
            } else {
              null;
            }
            const rc = new rastercoords(map, [11011, 11716]);
            map.setMaxZoom(rc.zoomLevel());
            return children(ReactLeaflet, map, rc, latLng, distance);
          }}
        </MapConsumer>
      </MapContainer>
    </div>
  );
};

export default Map;
