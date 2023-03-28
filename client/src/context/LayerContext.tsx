import { createContext } from "react";
import {
  subwayRoutesSourceId,
  subwayStationsSourceId,
} from "../helpers/Layers";

export type LayerContextType = {
  loadedSources: Set<string>;
  addToLoadedSources: (loadedSources: string) => void;
};
export const LayerContext = createContext<LayerContextType>({
  loadedSources: new Set([subwayStationsSourceId, subwayRoutesSourceId]),
  addToLoadedSources: () => {},
});
