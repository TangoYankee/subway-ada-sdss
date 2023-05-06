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
  LAYER_ID,
  SOURCE_ID,
} from "../helpers/MapLayers";
import { API_BASE_URL, DEFAULT_BASE_MAP_STYLE } from "../helpers/constants";
import { StationRankingDetailsPopup } from "./StationRankingDetailsPopup";
import { useContext, useEffect, useState } from "react";
import { RankingsContext } from "../context/RankingsContext";
import { CitySearchMarker } from "./CitySearchMarker";
import { CitySearchContext } from "../context/CitySearchContext";
import { BaseMapStyleSelector } from "./baseMapStyleSelector";
import { TractTotalPopulationPopup } from "./TractTotalPopulationPopup";

export const ADAMap = () => {
  const { sdssMap } = useMap();
  const { subwayStationAdaMap, complexId } = useContext(RankingsContext);
  const { selectedResultGeo } = useContext(CitySearchContext);
  const [baseMapStyle, setBaseMapStyle] = useState<"basic" | "hybrid">(
    DEFAULT_BASE_MAP_STYLE
  );

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

  useEffect(() => {
    if (sdssMap) {
      const map = sdssMap.getMap();
      map.setStyle(
        `https://api.maptiler.com/maps/${baseMapStyle}/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_TOKEN}`
      );
    }
  }, [sdssMap, baseMapStyle]);

  // Select ridership colors based on min and max values
  useEffect(() => {
    if (sdssMap) {
      sdssMap.on("load", () => {
        const stationFeatures = sdssMap.querySourceFeatures(
          SOURCE_ID.SUBWAY_STATIONS
        );
        const ridership: number[] = stationFeatures
          .map((f) => f.properties.ridership)
          .filter((ridership) => ridership !== undefined);
        const minRidership = Math.min(...ridership);
        const maxRidership = Math.max(...ridership);

        const colorExp = [
          "interpolate",
          ["linear"],
          ["get", "ridership"],
          minRidership,
          "#fff5f0",
          maxRidership,
          "#67000d",
        ];

        sdssMap
          .getMap()
          .setPaintProperty(
            LAYER_ID.SUBWAY_STATION_RIDERSHIP,
            "circle-color",
            colorExp
          );
      });
    }
  }, [sdssMap]);

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
      mapStyle={`https://api.maptiler.com/maps/${DEFAULT_BASE_MAP_STYLE}/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_TOKEN}`}
    >
      <BaseMapStyleSelector setBaseMapStyle={setBaseMapStyle} />
      <NavigationControl />
      <ScaleControl />
      <FullscreenControl />
      <CitySearchMarker />
      <TractTotalPopulationPopup />
      <StationRankingDetailsPopup />
      {layers}
    </ReactMapGL>
  );
};
