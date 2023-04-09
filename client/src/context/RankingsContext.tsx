import { createContext } from "react";
import { DEFAULT_FACTOR_WEIGHTS } from "../helpers/constants";
import { FactorWeightings, Rankings } from "../types.d";

export type RankingsContextType = {
  factorWeights: FactorWeightings;
  updateFactorWeight: (id: string, weight: number) => void;
  updateShouldWeight: (id: string, shouldWeight: boolean) => void;
  isRankingsProcessing: boolean;
  setIsRankingsProcessing: (isProcessing: boolean) => void;
  rankings: Rankings;
  getRankings: (queryString: string) => void;
};

export const RankingsContext = createContext<RankingsContextType>({
  factorWeights: DEFAULT_FACTOR_WEIGHTS,
  updateFactorWeight: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  updateShouldWeight: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  isRankingsProcessing: false,
  setIsRankingsProcessing: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  rankings: null,
  getRankings: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
