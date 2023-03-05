import { Box } from "@chakra-ui/react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DOMAIN = "http://tangled.city";

const busRouteLayerStyle = {
  id: "bus-routes",
  source: "bus-routes",
  type: "line" as const,
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.5,
  },
};

const busStopLayerStyle = {
  id: "bus-stops",
  source: "bus-stops",
  type: "circle" as const,
  paint: {
    "circle-color": "#222823",
    "circle-radius": 1.5,
    "circle-opacity": 0.5,
  },
};

const busRouteExpressLayerStyle = {
  id: "bus-routes-express",
  source: "bus-routes-express",
  type: "line" as const,
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.5,
  },
};

const busStopExpressLayerStyle = {
  id: "bus-stops-express",
  source: "bus-stops-express",
  type: "circle" as const,
  paint: {
    "circle-color": "#81C0DE",
    "circle-radius": 2,
    "circle-opacity": 0.75,
  },
};

const MapPage = () => (
  <Box height="100%" flex="1">
    <ReactMapGL
      mapLib={maplibregl}
      initialViewState={{
        longitude: -74.0,
        latitude: 40.74,
        zoom: 10,
      }}
      mapStyle={`https://api.maptiler.com/maps/basic/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_TOKEN}`}
    >
      <Source
        id="bus-routes"
        type="geojson"
        data={`${DOMAIN}/api/v1/bus-routes`}
      >
        <Layer {...busRouteLayerStyle} />
      </Source>
      <Source id="bus-stops" type="geojson" data={`${DOMAIN}/api/v1/bus-stops`}>
        <Layer {...busStopLayerStyle} />
      </Source>
      <Source
        id="bus-routes-express"
        type="geojson"
        data={`${DOMAIN}/api/v1/bus-routes-express`}
      >
        <Layer {...busRouteExpressLayerStyle} />
      </Source>
      <Source
        id="bus-stops-express"
        type="geojson"
        data={`${DOMAIN}/api/v1/bus-stops-express`}
      >
        <Layer {...busStopExpressLayerStyle} />
      </Source>
    </ReactMapGL>
  </Box>
);

export default MapPage;
