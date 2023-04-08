import { Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RankingsContext } from "../context/RankingsContext";
import { FactorWeightings } from "../types";

const buildQueryString = (factorWeights: FactorWeightings) =>
  Object.values(factorWeights)
    .filter((factorWeight) => factorWeight.shouldWeight)
    .map((factorWeight) => `${factorWeight.id}=${factorWeight.weight}&`)
    .toString()
    .slice(0, -1); // remove the trailing ampersand

export const RankStationBtn = () => {
  const { factorWeights, isRankingsProcessing, getRankings } =
    useContext(RankingsContext);
  const [queryString, setQueryString] = useState(
    buildQueryString(factorWeights)
  );

  useEffect(() => {
    setQueryString(buildQueryString(factorWeights));
  }, [factorWeights]);

  return (
    <Button
      variant="outline"
      colorScheme="blue"
      isLoading={isRankingsProcessing}
      loadingText="Ranking"
      onClick={() => getRankings(queryString)}
    >
      Rank Stations
    </Button>
  );
};
