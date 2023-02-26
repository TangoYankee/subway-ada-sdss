import { Box } from "@chakra-ui/react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DOMAIN = "http://localhost:8000"

const busRouteLayerStyle = {
  id: "bus-routes",
  source: "bus-routes",
  type: "line" as "line",
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.5,
  },
};

const busStopLayerStyle = {
  id: "bus-stops",
  source: "bus-stops",
  type: "circle" as "circle",
  paint: {
    "circle-color": "#222823",
    "circle-radius": 1.5,
    "circle-opacity": 0.5
  }
}

const MapPage = () => (
  <Box height="100%" flex="1">
    <ReactMapGL
      mapLib={maplibregl}
      initialViewState={{
        longitude: -74.00,
        latitude: 40.74,
        zoom: 10,
      }}
      mapStyle={`https://api.maptiler.com/maps/basic/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_TOKEN}`}
    >
      <Source
        id="bus-routes"
        type="geojson"
        data={"http://localhost:8000/api/v1/bus-routes"}
      >
        <Layer {...busRouteLayerStyle} />
      </Source>
      <Source
        id="bus-stops"
        type="geojson"
        data={`${DOMAIN}/api/v1/bus-stops`}
      >
        <Layer {...busStopLayerStyle} />
      </Source>
    </ReactMapGL>
  </Box>
);

export default MapPage;
