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

  useEffect(() => {
    if (sdssMap) {
      sdssMap.on("load", () => {
        const stationFeatures = sdssMap.querySourceFeatures(
          SOURCE_ID.SUBWAY_STATIONS
        );

        // Select ridership colors based on min and max values
        const ridership: number[] = stationFeatures
          .map((f) => f.properties.ridership)
          .filter((ridership) => ridership !== undefined);
        const minRidership = Math.min(...ridership);
        const maxRidership = Math.max(...ridership);

        const ridershipColor = [
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
            ridershipColor
          );
        // End Ridership layer

        // ADA Neighbor gap colors
        const adaNeighborGap: number[] = stationFeatures.map((f) =>
          parseFloat(f.properties.ada_neighbor_gap)
        );
        const minGap = Math.min(...adaNeighborGap);
        const maxGap = Math.max(...adaNeighborGap);

        const gapColor = [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "ada_neighbor_gap"]],
          minGap,
          "#fcfbfd",
          maxGap,
          "#3f007d",
        ];

        sdssMap
          .getMap()
          .setPaintProperty(
            LAYER_ID.SUBWAY_STATION_ADA_NEIGHBOR_GAP,
            "circle-color",
            gapColor
          );
        // End Ada Nieghbor gap colors

        // Betweenness Centrality
        const betweennessCentrality: number[] = stationFeatures
          .map((f) => f.properties.betweenness_centrality)
          .filter((b) => b)
          .map((b) => parseFloat(b));

        const minBetweenness = Math.min(...betweennessCentrality);
        const maxBetweenness = Math.max(...betweennessCentrality);

        const betweennessColor = [
          "interpolate",
          ["linear"],
          // ['*', ["to-number", ["get", "betweenness_centrality"]], standardizer],
          ["to-number", ["get", "betweenness_centrality"]],
          minBetweenness,
          "#f7fcf5",
          maxBetweenness,
          "#00441b",
        ];

        sdssMap
          .getMap()
          .setPaintProperty(
            LAYER_ID.SUBWAY_STATION_BETWEENNESS_CENTRALITY,
            "circle-color",
            betweennessColor
          );
        // End Betweenness Centrality
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
