import { Box, Button, Flex } from "@chakra-ui/react";
import ReactMapGL, { Source, Layer, MapProvider } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LayerCard } from "../components/LayerCard";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { ContentPanel } from "../components/ContentPanel";

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

const busStopSourceId = "bus-stops";
const busStopLayerId = busStopSourceId;
const busStopLayerStyle = {
  id: busStopLayerId,
  source: busStopSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#1A202C",
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
    "circle-color": "#00933C",
    "circle-radius": 2,
    "circle-opacity": 0.75,
  },
};

const hospitalsSourceId = "hospitals";
const hospitalsLayerId = hospitalsSourceId;
const hospitalsLayerStyle = {
  id: hospitalsLayerId,
  source: hospitalsSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#E53E3E",
    "circle-radius": 3,
    "circle-opacity": 0.75,
  },
};

const parksSourceId = "parks";
const parksLayerId = parksSourceId;
const parksLayerStyle = {
  id: parksLayerId,
  source: parksSourceId,
  type: "fill" as const,
  paint: {
    "fill-color": "#25855A",
    "fill-outline-color": "#E2E8F0",
    "fill-opacity": 0.5,
  },
};

const schoolsSourceId = "schools";
const schoolsLayerId = schoolsSourceId;
const schoolsLayerStyle = {
  id: schoolsLayerId,
  source: schoolsSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#ECC94B",
    "circle-radius": 3,
    "circle-opacity": 0.75,
  },
};

const subwayRoutesSourceId = "subway-routes";
const subwayRoutesLayerId = subwayRoutesSourceId;
const subwayRoutesLayerStyle = {
  id: subwayRoutesLayerId,
  source: subwayRoutesSourceId,
  type: "line" as const,
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.75,
  },
};

const subwayStationsSourceId = "subway-stations";
const subwayStationLayerId = subwayStationsSourceId;
const subwayStationLayerStyle = {
  id: subwayStationLayerId,
  source: subwayStationsSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#222834",
    "circle-radius": 3.5,
    "circle-opacity": 0.75,
  },
};

const MapPage = () => {
  const [loadedSources, setLoadedSources] = useState<Set<string>>(
    new Set([subwayStationsSourceId, subwayRoutesSourceId])
  );
  const [showPanel, setShowPanel] = useState(true);

  const addToLoadedSources = (source: string) => {
    const _loadedSources = cloneDeep(loadedSources);
    _loadedSources.add(source);
    setLoadedSources(_loadedSources);
  };

  return (
    <Box height="100%" flex="1">
      <MapProvider>
        <ContentPanel />
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
          {loadedSources.has(subwayStationsSourceId) ? (
            <Source
              id={subwayStationsSourceId}
              type="geojson"
              data={`${API_BASE_URL}/api/v1/subway-stations`}
            >
              <Layer {...subwayStationLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
          {loadedSources.has(subwayRoutesSourceId) ? (
            <Source
              id={subwayRoutesSourceId}
              type="geojson"
              data={`${API_BASE_URL}/api/v1/subway-routes`}
            >
              <Layer {...subwayRoutesLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
          {loadedSources.has(hospitalsSourceId) ? (
            <Source
              id={hospitalsSourceId}
              type="geojson"
              data={`${API_BASE_URL}/api/v1/hospitals`}
            >
              <Layer {...hospitalsLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
          {loadedSources.has(parksSourceId) ? (
            <Source
              id={parksSourceId}
              type="geojson"
              data={`${API_BASE_URL}/api/v1/parks`}
            >
              <Layer {...parksLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
          {loadedSources.has(schoolsSourceId) ? (
            <Source
              id={schoolsSourceId}
              type="geojson"
              data={`${API_BASE_URL}/api/v1/schools`}
            >
              <Layer {...schoolsLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
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
          {loadedSources.has(busStopSourceId) ? (
            <Source
              id={busStopSourceId}
              type="geojson"
              data={`${API_BASE_URL}/api/v1/bus-stops`}
            >
              <Layer {...busStopLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
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
          {loadedSources.has(busStopsExpressSourceId) ? (
            <Source
              id={busStopsExpressSourceId}
              type="geojson"
              data={`${API_BASE_URL}/api/v1/bus-stops-express`}
            >
              <Layer {...busStopExpressLayerStyle} />
            </Source>
          ) : (
            <></>
          )}
        </ReactMapGL>
        {/* <Flex
          pos="relative"
          top="2vh"
          left="2vh"
          maxHeight="92vh"
          direction="column"
          display="none"
        >
          <Box>
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => setShowPanel(!showPanel)}
            >
              {showPanel ? "Hide" : "Show"} Panel
            </Button>
          </Box>
          <Flex
            direction="column"
            overflow="scroll"
            display={showPanel ? "flex" : "none"}
          >
            <LayerCard
              layerId={subwayStationLayerId}
              isSourceLoaded={loadedSources.has(subwayStationsSourceId)}
              addToLoadedSources={() =>
                addToLoadedSources(subwayStationsSourceId)
              }
            >
              Subway Stations
            </LayerCard>
            <LayerCard
              layerId={subwayRoutesLayerId}
              isSourceLoaded={loadedSources.has(subwayRoutesSourceId)}
              addToLoadedSources={() =>
                addToLoadedSources(subwayRoutesSourceId)
              }
            >
              Subway Routes
            </LayerCard>
            <LayerCard
              layerId={hospitalsLayerId}
              isSourceLoaded={loadedSources.has(hospitalsSourceId)}
              addToLoadedSources={() => addToLoadedSources(hospitalsSourceId)}
            >
              Hospitals
            </LayerCard>
            <LayerCard
              layerId={parksLayerId}
              isSourceLoaded={loadedSources.has(parksSourceId)}
              addToLoadedSources={() => addToLoadedSources(parksSourceId)}
            >
              Parks
            </LayerCard>
            <LayerCard
              layerId={schoolsLayerId}
              isSourceLoaded={loadedSources.has(schoolsSourceId)}
              addToLoadedSources={() => addToLoadedSources(schoolsSourceId)}
            >
              Schools
            </LayerCard>
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
            <LayerCard
              layerId={busStopsExpressLayerId}
              addToLoadedSources={() =>
                addToLoadedSources(busStopsExpressSourceId)
              }
              isSourceLoaded={loadedSources.has(busStopsExpressSourceId)}
            >
              Express Bus Stops
            </LayerCard>
          </Flex>
        </Flex> */}
      </MapProvider>
    </Box>
  );
};

export default MapPage;
