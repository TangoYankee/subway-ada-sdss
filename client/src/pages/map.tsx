import { Box, Text } from "@chakra-ui/react";
import ReactMapGL, {Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapPage = () => (
  <Box height="100%" flex="1">
    <ReactMapGL
      initialViewState ={{
        longitude: 2.632,
        latitude: 28.163,
        zoom: 4,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      <Source id="algera-border" type="geojson" data={"http://localhost:8000/world/border/2?format=json"}></Source>
    </ReactMapGL>
  </Box>
);

export default MapPage;
