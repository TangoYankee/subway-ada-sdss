import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { RankingsContext } from "../context/RankingsContext";

export const RankStationBtn = () => {
  const { factorWeights, isRankingsProcessing, getRankings } =
    useContext(RankingsContext);

  const queryString = Object.values(factorWeights)
    .filter((factorWeight) => factorWeight.shouldWeight)
    .map((factorWeight) => `${factorWeight.id}=${factorWeight.weight}&`)
    .toString()
    .slice(0, -1); // remove the trailing ampersand

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
