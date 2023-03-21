import { Box, Flex } from "@chakra-ui/react";
import ReactMapGL, { Source, Layer, MapProvider } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LayerCard } from "../components/LayerCard";
import { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "localhost:8001";
const API_BASE_URL = `http://${API_DOMAIN}`;

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

const MapPage = () => {
  const [loadedSources, setLoadedSources] = useState<Set<string>>(new Set());

  const addToLoadedSources = (source: string) =>{
    console.log('source', source);
    // const _loadedSoures = new Set(loadedSources);
    // const _loadedSources: Set<string> = cloneDeep(loadedSources);
    const _loadedSources= cloneDeep(loadedSources);
    _loadedSources.add(source);
    console.log('added loaded sources',loadedSources);
    setLoadedSources(_loadedSources);
  }

  useEffect(() => {
    console.log('loadedSources', loadedSources);
  }, [loadedSources])

  return (
    <Box height="100%" flex="1">
      <MapProvider>
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
          {/* <Source
        id="bus-routes"
        type="geojson"
        data={`${API_BASE_URL}/api/v1/bus-routes`}
      >
        <Layer {...busRouteLayerStyle} />
      </Source>
      <Source
        id="bus-stops"
        type="geojson"
        data={`${API_BASE_URL}/api/v1/bus-stops`}
      >
        <Layer {...busStopLayerStyle} />
      </Source> */}
          {loadedSources.has("bus-routes-express") ? (
            <Source
              id="bus-routes-express"
              type="geojson"
              data={`${API_BASE_URL}/api/v1/bus-routes-express`}
            >
              <Layer {...busRouteExpressLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
          {/* <Source
            id="bus-stops-express"
            type="geojson"
            data={`${API_BASE_URL}/api/v1/bus-stops-express`}
          >
            <Layer {...busStopExpressLayerStyle} />
          </Source> */}
        </ReactMapGL>
        <Flex
          pos="absolute"
          top="1rem"
          left="1rem"
          direction="column"
          // backgroundColor='whiteAlpha.700'
          // borderRadius='1px'
          // borderStyle='solid'
          // borderColor='blackAlpha.700'
          // borderWidth='1px'
        >
          <LayerCard addToLoadedSources={addToLoadedSources} isSourceLoaded={loadedSources.has('bus-routes-express')}/>
        </Flex>
      </MapProvider>
    </Box>
  );
};

export default MapPage;
