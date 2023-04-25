import ReactMapGL, {
  Source,
  Layer,
  useMap,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  LAYER_ID,
  SOURCE_ID,
  SOURCE_ENDPOINT,
  SOURCED_FACTORS,
  LAYER_PAINT,
  LAYER_DEFAULT_VISIBILITY,
} from "../helpers/MapLayers";
import { API_BASE_URL } from "../helpers/constants";
import { StationRankingDetailsPopup } from "./StationRankingDetailsPopup";
import { useContext, useEffect } from "react";
import { RankingsContext } from "../context/RankingsContext";
import { CitySearchMarker } from "./CitySearchMarker";

export const ADAMap = () => {
  const { sdssMap } = useMap();
  const { subwayStationAdaMap, complexId } = useContext(RankingsContext);

  useEffect(() => {
    if (sdssMap && subwayStationAdaMap && complexId) {
      const { lat, lng } = subwayStationAdaMap[complexId];
      sdssMap.easeTo({ center: [lng, lat] });
    }
  }, [subwayStationAdaMap, sdssMap, complexId]);

  const factorLayers = Object.entries(SOURCED_FACTORS).map(
    ([sourceId, layerIds]) => (
      <Source
        key={sourceId}
        id={sourceId}
        type="geojson"
        data={`${API_BASE_URL}/api/v1/${SOURCE_ENDPOINT[sourceId]}`}
      >
        {layerIds.map((layerId) => (
          <Layer
            key={layerId}
            {...{
              id: layerId,
              source: sourceId,
              layout: { visibility: LAYER_DEFAULT_VISIBILITY[layerId] },
              ...LAYER_PAINT[layerId],
            }}
          />
        ))}
      </Source>
    )
  );
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
      <NavigationControl />
      <ScaleControl />
      <FullscreenControl />
      <CitySearchMarker />
      <StationRankingDetailsPopup />
      {factorLayers}
      <Source
        id={SOURCE_ID.SUBWAY_STATIONS}
        type="geojson"
        promoteId={"complex_id"}
        data={`${API_BASE_URL}/api/v1/${
          SOURCE_ENDPOINT[SOURCE_ID.SUBWAY_STATIONS]
        }`}
      >
        <Layer
          key={LAYER_ID.SUBWAY_STATION_ADA_CODE}
          {...{
            id: LAYER_ID.SUBWAY_STATION_ADA_CODE,
            source: SOURCE_ID.SUBWAY_STATIONS,
            layout: {
              visibility:
                LAYER_DEFAULT_VISIBILITY[LAYER_ID.SUBWAY_STATION_ADA_CODE],
            },
            ...LAYER_PAINT[LAYER_ID.SUBWAY_STATION_ADA_CODE],
          }}
        />
      </Source>
      <Source
        id={SOURCE_ID.SUBWAY_ROUTES}
        type="geojson"
        data={`${API_BASE_URL}/api/v1/${
          SOURCE_ENDPOINT[SOURCE_ID.SUBWAY_ROUTES]
        }`}
      >
        <Layer
          key={LAYER_ID.SUBWAY_ROUTE_LINE_COLOR}
          {...{
            id: LAYER_ID.SUBWAY_ROUTE_LINE_COLOR,
            source: SOURCE_ID.SUBWAY_ROUTES,
            layout: {
              visibility:
                LAYER_DEFAULT_VISIBILITY[LAYER_ID.SUBWAY_ROUTE_LINE_COLOR],
            },
            ...LAYER_PAINT[LAYER_ID.SUBWAY_ROUTE_LINE_COLOR],
          }}
        />
      </Source>
    </ReactMapGL>
  );
};
