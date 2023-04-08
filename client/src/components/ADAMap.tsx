import ReactMapGL, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext } from "react";
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
  );
};
