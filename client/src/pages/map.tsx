import { Box } from "@chakra-ui/react";
import { MapProvider } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { ContentPanel } from "../components/ContentPanel";
import { LayerContext } from "../context/LayerContext";
import { ADAMap } from "../components/ADAMap";
import { FactorWeightings, Rankings } from "../types";
import { RankingsContext } from "../context/RankingsContext";
import { API_BASE_URL, DEFAULT_FACTOR_WEIGHTS } from "../helpers/constants";
import { SOURCE_ID } from "../helpers/MapLayers";

const MapPage = () => {
  const [factorWeights, setFactorWeights] = useState<FactorWeightings>(
    DEFAULT_FACTOR_WEIGHTS
  );
  const [isRankingsProcessing, setIsRankingsProcessing] =
    useState<boolean>(false);
  const [rankings, setRankings] = useState<Rankings>(null);
  const [loadedSources, setLoadedSources] = useState<Set<string>>(
    new Set([
      SOURCE_ID.SUBWAY_STATIONS,
      SOURCE_ID.SUBWAY_ROUTES,
      SOURCE_ID.TRACTS,
    ])
  );

  const addToLoadedSources = (source: string) => {
    const _loadedSources = cloneDeep(loadedSources);
    _loadedSources.add(source);
    setLoadedSources(_loadedSources);
  };

  const updateFactorWeight = (id: string, weight: number) => {
    const _factorWeights = cloneDeep(factorWeights);
    _factorWeights[id].weight = weight;
    setFactorWeights(_factorWeights);
  };

  const updateShouldWeight = (id: string, shouldWeight: boolean) => {
    const _factorWeights = cloneDeep(factorWeights);
    _factorWeights[id].shouldWeight = shouldWeight;
    setFactorWeights(_factorWeights);
  };

  const getRankings = async (queryString: string) => {
    setIsRankingsProcessing(true);
    const requestUrl = `${API_BASE_URL}/api/v1/rankings?${queryString}`;
    const response = await fetch(requestUrl);
    const _rankings = await response.json();
    setRankings(_rankings);
    setIsRankingsProcessing(false);
  };

  return (
    <Box height="100%" flex="1">
      <MapProvider>
        <RankingsContext.Provider
          value={{
            factorWeights,
            updateFactorWeight,
            updateShouldWeight,
            isRankingsProcessing,
            setIsRankingsProcessing,
            rankings,
            getRankings,
          }}
        >
          <LayerContext.Provider
            value={{
              loadedSources,
              addToLoadedSources,
            }}
          >
            <ContentPanel />
            <ADAMap />
          </LayerContext.Provider>
        </RankingsContext.Provider>
      </MapProvider>
    </Box>
  );
};

export default MapPage;
