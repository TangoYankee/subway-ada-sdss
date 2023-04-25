import { createContext } from "react";
import { GeoCoords } from "../types";

export type CitySearchContextType = {
  selectedResultGeo: GeoCoords | null;
  setSelectedResultGeo: (geoCoords: GeoCoords | null) => void;
};

export const CitySearchContext = createContext<CitySearchContextType>({
  selectedResultGeo: null,
  setSelectedResultGeo: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
