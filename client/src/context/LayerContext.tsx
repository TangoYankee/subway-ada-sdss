import { createContext } from "react";
import { LAYER_VISIBILITY_STATE } from "../helpers/MapLayers";

export type LayerContextType = {
  layerVisibilities: Record<string, LAYER_VISIBILITY_STATE>;
  updateLayerVisibility: (
    layerId: string,
    visibility: LAYER_VISIBILITY_STATE
  ) => void;
};

export const LayerContext = createContext<LayerContextType>({
  layerVisibilities: {},
  updateLayerVisibility: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
