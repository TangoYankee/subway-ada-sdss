import ReactMapGL, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext } from "react";
import {
  LAYER_ID,
  LAYER_STYLE,
  SOURCE_ID,
  SOURCE_ENDPOINT,
} from "../helpers/MapLayers";
import { LayerContext } from "../context/LayerContext";
import { API_BASE_URL } from "../helpers/constants";

export const ADAMap = () => {
  const { loadedSources } = useContext(LayerContext);

  return (
    <ReactMapGL
      id="sdssMap"
      mapLib={maplibregl}
      initialViewState={{
        longitude: -74.0,
        latitude: 40.74,
        zoom: 10,
      }}
      mapStyle={`https://api.maptiler.com/maps/basic/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_TOKEN}`}
    >
      {loadedSources.has(SOURCE_ID.SUBWAY_STATIONS) ? (
        <Source
          id={SOURCE_ID.SUBWAY_STATIONS}
          type="geojson"
          data={`${API_BASE_URL}/api/v1/${
            SOURCE_ENDPOINT[SOURCE_ID.SUBWAY_STATIONS]
          }`}
        >
          <Layer {...LAYER_STYLE[LAYER_ID.SUBWAY_STATION_LOCATION]} />
        </Source>
      ) : (
        <></>
      )}
      {loadedSources.has(SOURCE_ID.SUBWAY_ROUTES) ? (
        <Source
          id={SOURCE_ID.SUBWAY_ROUTES}
          type="geojson"
          data={`${API_BASE_URL}/api/v1/${
            SOURCE_ENDPOINT[SOURCE_ID.SUBWAY_ROUTES]
          }`}
        >
          <Layer {...LAYER_STYLE[LAYER_ID.SUBWAY_ROUTE_LINE_COLOR]} />
        </Source>
      ) : (
        <></>
      )}
      {loadedSources.has(SOURCE_ID.TRACTS) ? (
        <Source
          id={SOURCE_ENDPOINT.TRACTS}
          type="geojson"
          data={`${API_BASE_URL}/api/v1/${SOURCE_ENDPOINT[SOURCE_ID.TRACTS]}`}
        >
          <Layer {...LAYER_STYLE[LAYER_ID.TOTAL]} />
          <Layer {...LAYER_STYLE[LAYER_ID.UNDER_FIVE]} />
        </Source>
      ) : (
        <></>
      )}
    </ReactMapGL>
  );
};
