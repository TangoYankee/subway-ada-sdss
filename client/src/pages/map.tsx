import { Box } from "@chakra-ui/react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const algeriaBorderLayerStyle = {
  id: "algeria-border",
  source: "algeria-border",
  type: "fill" as const,
  paint: {
    "fill-color": "#0080ff",
    "fill-opacity": 0.5,
  },
};

const MapPage = () => (
  <Box height="100%" flex="1">
    <ReactMapGL
      initialViewState={{
        longitude: 2.632,
        latitude: 28.163,
        zoom: 4,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      <Source
        id="algeria-border"
        type="geojson"
        data={"http://localhost:8000/world/border/2"}
      >
        <Layer {...algeriaBorderLayerStyle} />
      </Source>
    </ReactMapGL>
  </Box>
);

export default MapPage;
