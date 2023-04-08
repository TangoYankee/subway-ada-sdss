import { createContext } from "react";
import { Rankings } from "../types.d";

export type RankingsContextType = {
  isRankingsProcessing: boolean;
  setIsRankingsProcessing: (isProcessing: boolean) => void;
  rankings: Rankings;
  setRankings: (rankings: Rankings) => void;
};

export const RankingsContext = createContext<RankingsContextType>({
  isRankingsProcessing: false,
  setIsRankingsProcessing: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  rankings: null,
  setRankings: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
