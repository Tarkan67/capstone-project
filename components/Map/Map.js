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
  pinned,
  setPinned,
  animation,
  setAnimation,
  distanceRight,
  setDistanceRight,
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
    function expandMapHandler() {
      setExpandMap(false);
    }
    function animationHandlerTrue() {
      setAnimation(true);
    }
    function animationHandlerFalse() {
      setAnimation(false);
    }
    const map = ReactLeaflet.useMapEvents({
      dblclick: (e) => {
        setExpandMap(true);
        setTimeout(animationHandlerTrue, 1001);
      },
      mouseover: (e) => {
        setExpandMap(true);
        setTimeout(animationHandlerTrue, 1001);
      },
      // mouseover: (e) => {
      //   setTimeout(animationHandlerFalse, 1500);
      //   setTimeout(expandMapHandler, 3000);
      // },
      click: (e) => {
        function handleAddMarker(marker) {
          setMarkerStore(marker);
        }
        function handleClickCount() {
          setClickCount(clickCount);
        }
        function handleDistance(marker) {
          currentPicture
            ? setDistance(
                map.distance(
                  [marker._latlng.lat, marker._latlng.lng],
                  [currentPicture.LatLng.lat, currentPicture.LatLng.lng]
                ) / 1000
              )
            : null;
        }
        setLatLng(e.latlng);
        const { lat, lng } = e.latlng;
        if (distanceRight !== 2 && distanceRight !== 1) {
          if (clickCount === 0 && !checkAnswer) {
            handleClickCount(clickCount + 1);
            markerStore ? map.removeLayer(markerStore) : null;
            const marker = L.marker([lat, lng], { Icon }).addTo(layerGroup);
            handleAddMarker(marker);
            handleDistance(marker);
          } else if (clickCount === 1 && !checkAnswer) {
            handleClickCount(clickCount - 1);
            markerStore ? map.removeLayer(markerStore) : null;
            const marker = L.marker([lat, lng], { Icon }).addTo(layerGroup);
            handleAddMarker(marker);
            handleDistance(marker);
          }
        }
      },
    });
    return null;
  }

  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [animation]);

  return (
    <div
      className={cx(styles.map, { [styles.mapExpanded]: expandMap || pinned })}
    >
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

            if (checkAnswer && markerStore && currentPicture) {
              "polyline",
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
