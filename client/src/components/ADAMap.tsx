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
  SOURCE_ENDPOINT,
  LAYER_PAINT,
  LAYER_DEFAULT_VISIBILITY,
  SOURCED_LAYERS,
} from "../helpers/MapLayers";
import { API_BASE_URL } from "../helpers/constants";
import { StationRankingDetailsPopup } from "./StationRankingDetailsPopup";
import { useContext, useEffect } from "react";
import { RankingsContext } from "../context/RankingsContext";
import { CitySearchMarker } from "./CitySearchMarker";
import { CitySearchContext } from "../context/CitySearchContext";

export const ADAMap = () => {
  const { sdssMap } = useMap();
  const { subwayStationAdaMap, complexId } = useContext(RankingsContext);
  const { selectedResultGeo } = useContext(CitySearchContext);

  useEffect(() => {
    if (sdssMap && subwayStationAdaMap && complexId) {
      const { lat, lng } = subwayStationAdaMap[complexId];
      sdssMap.easeTo({ center: [lng, lat] });
    }
  }, [subwayStationAdaMap, sdssMap, complexId]);

  useEffect(() => {
    if (sdssMap && selectedResultGeo) {
      const { lat, lng } = selectedResultGeo;
      sdssMap.easeTo({ center: [lng, lat] });
    }
  }, [sdssMap, selectedResultGeo]);

  const layers = Object.entries(SOURCED_LAYERS).map(([sourceId, layerIds]) => (
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
  ));

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
      {layers}
    </ReactMapGL>
  );
};
