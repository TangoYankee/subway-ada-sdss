import { Box } from "@chakra-ui/react";
import ReactMapGL, { Source, Layer, MapProvider } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { ContentPanel } from "../components/ContentPanel";
import {
  busRouteExpressLayerStyle,
  busRouteLayerStyle,
  busRoutesExpressSourceId,
  busRoutesSourceId,
  busStopExpressLayerStyle,
  busStopLayerStyle,
  busStopsExpressSourceId,
  busStopSourceId,
  hospitalsLayerStyle,
  hospitalsSourceId,
  parksLayerStyle,
  parksSourceId,
  schoolsLayerStyle,
  schoolsSourceId,
  subwayRoutesLayerStyle,
  subwayRoutesSourceId,
  subwayStationLayerStyle,
  subwayStationsSourceId,
} from "../helpers/Layers";
import { LayerContext } from "../context/LayerContext";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "localhost:8001";
const API_BASE_URL = `http://${API_DOMAIN}`;

const MapPage = () => {
  const [loadedSources, setLoadedSources] = useState<Set<string>>(
    new Set([subwayStationsSourceId, subwayRoutesSourceId])
  );

  const addToLoadedSources = (source: string) => {
    const _loadedSources = cloneDeep(loadedSources);
    _loadedSources.add(source);
    setLoadedSources(_loadedSources);
  };

  return (
    <Box height="100%" flex="1">
      <MapProvider>
        <LayerContext.Provider
          value={{
            loadedSources,
            addToLoadedSources,
          }}
        >
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
        </LayerContext.Provider>
      </MapProvider>
    </Box>
  );
};

export default MapPage;
