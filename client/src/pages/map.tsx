import { Box } from "@chakra-ui/react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const algeriaBorderLayerStyle = {
  id: "bus-routes",
  source: "bus-routes",
  type: "line" as "line",
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.5,
  },
};

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
        <Layer {...algeriaBorderLayerStyle} />
      </Source>
    </ReactMapGL>
  </Box>
);

export default MapPage;
