import { Box, Flex } from "@chakra-ui/react";
import ReactMapGL, { Source, Layer, MapProvider } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LayerCard } from "../components/LayerCard";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "localhost:8001";
const API_BASE_URL = `http://${API_DOMAIN}`;

const busRoutesSourceId = "bus-routes";
const busRoutesLayerId = busRoutesSourceId;
const busRouteLayerStyle = {
  id: busRoutesLayerId,
  source: busRoutesSourceId,
  type: "line" as const,
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.5,
  },
};

const busStopSourceId = 'bus-stops';
const busStopLayerId = busStopSourceId;
const busStopLayerStyle = {
  id: busStopLayerId,
  source: busStopSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#222823",
    "circle-radius": 1.5,
    "circle-opacity": 0.5,
  },
};

const busRoutesExpressSourceId = "bus-routes-express";
const busRoutesExpressLayerId = busRoutesExpressSourceId;
const busRouteExpressLayerStyle = {
  id: busRoutesExpressLayerId,
  source: busRoutesExpressSourceId,
  type: "line" as const,
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.5,
  },
};

const busStopsExpressSourceId = "bus-stops-express";
const busStopsExpressLayerId = busStopsExpressSourceId;
const busStopExpressLayerStyle = {
  id: busStopsExpressLayerId,
  source: busStopsExpressSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#81C0DE",
    "circle-radius": 2,
    "circle-opacity": 0.75,
  },
};

const MapPage = () => {
  const [loadedSources, setLoadedSources] = useState<Set<string>>(
    new Set([busRoutesExpressSourceId])
  );

  const addToLoadedSources = (source: string) => {
    const _loadedSources = cloneDeep(loadedSources);
    _loadedSources.add(source);
    setLoadedSources(_loadedSources);
  };

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
          {loadedSources.has(busRoutesSourceId) ? (
            <Source
              id={busRoutesSourceId}
              type="geojson"
              data={`${API_BASE_URL}/api/v1/bus-routes`}
            >
              <Layer {...busRouteLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
          {loadedSources.has(busStopSourceId)
            ? <Source
            id={busStopSourceId}
            type="geojson"
            data={`${API_BASE_URL}/api/v1/bus-stops`}
          >
            <Layer {...busStopLayerStyle} />
          </Source>
          : <></>}
          {loadedSources.has(busRoutesExpressSourceId) ? (
            <Source
              id={busRoutesExpressSourceId}
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
          <LayerCard
            layerId={busRoutesLayerId}
            isSourceLoaded={loadedSources.has(busRoutesSourceId)}
            addToLoadedSources={() => addToLoadedSources(busRoutesSourceId)}
          >
            Bus Routes
          </LayerCard>
          <LayerCard
            layerId={busStopSourceId}
            isSourceLoaded={loadedSources.has(busStopLayerId)}
            addToLoadedSources={() => addToLoadedSources(busStopSourceId)}
          >
            Bus Stops
          </LayerCard>
          <LayerCard
            layerId={busRoutesExpressLayerId}
            addToLoadedSources={() =>
              addToLoadedSources(busRoutesExpressSourceId)
            }
            isSourceLoaded={loadedSources.has(busRoutesExpressSourceId)}
          >
            Express Bus Routes
          </LayerCard>
        </Flex>
      </MapProvider>
    </Box>
  );
};

export default MapPage;
