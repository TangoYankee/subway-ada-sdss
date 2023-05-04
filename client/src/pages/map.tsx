import { Box } from "@chakra-ui/react";
import { MapProvider } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { ContentPanel } from "../components/ContentPanel";
import { ADAMap } from "../components/ADAMap";
import {
  FactorWeightings,
  GeoCoords,
  Rankings,
  SubwayStationAdaMap,
} from "../types";
import { RankingsContext } from "../context/RankingsContext";
import { API_BASE_URL, DEFAULT_FACTOR_WEIGHTS } from "../helpers/constants";
import {
  getSubwayStationAdaCollection,
  parseSubwayStationAdaMap,
} from "../helpers/utils";
import { CitySearchContext } from "../context/CitySearchContext";

const MapPage = () => {
  const [factorWeights, setFactorWeights] = useState<FactorWeightings>(
    DEFAULT_FACTOR_WEIGHTS
  );
  const [complexId, setComplexId] = useState<string | null>(null);
  const [isRankingsProcessing, setIsRankingsProcessing] =
    useState<boolean>(false);
  const [rankings, setRankings] = useState<Rankings>(null);
  const [subwayStationAdaMap, setSubwayStationAdaMap] =
    useState<SubwayStationAdaMap>(null);
  const [selectedResultGeo, setSelectedResultGeo] = useState<GeoCoords | null>(
    null
  );

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

  useEffect(() => {
    (async () => {
      const subwayStationAdaCollection = await getSubwayStationAdaCollection();
      if (subwayStationAdaCollection !== null)
        setSubwayStationAdaMap(
          parseSubwayStationAdaMap(subwayStationAdaCollection)
        );
    })();
  }, []);

  return (
    <Box height="100%" flex="1">
      <MapProvider>
        <CitySearchContext.Provider
          value={{
            selectedResultGeo,
            setSelectedResultGeo,
          }}
        >
          <RankingsContext.Provider
            value={{
              factorWeights,
              updateFactorWeight,
              updateShouldWeight,
              isRankingsProcessing,
              setIsRankingsProcessing,
              rankings,
              getRankings,
              subwayStationAdaMap,
              complexId,
              setComplexId,
            }}
          >
            <ContentPanel />
            <ADAMap />
          </RankingsContext.Provider>
        </CitySearchContext.Provider>
      </MapProvider>
    </Box>
  );
};

export default MapPage;
