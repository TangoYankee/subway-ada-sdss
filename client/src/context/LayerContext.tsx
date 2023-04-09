import { createContext } from "react";

export type LayerContextType = {
  loadedSources: Set<string>;
  addToLoadedSources: (loadedSources: string) => void;
};
export const LayerContext = createContext<LayerContextType>({
  loadedSources: new Set(),
  addToLoadedSources: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
