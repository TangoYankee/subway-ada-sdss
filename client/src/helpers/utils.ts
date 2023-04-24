import {
  GeoSearchResults,
  SubwayStationAda,
  SubwayStationAdaCollection,
  SubwayStationAdaMap,
} from "../types";
import { API_BASE_URL } from "./constants";

export const getSubwayStationAdaCollection = async () => {
  let subwayStationAdaCollection: SubwayStationAdaCollection = null;
  const endpoint = "subway-stations-ada";
  const requestUrl = `${API_BASE_URL}/api/v1/${endpoint}`;
  try {
    const response = await fetch(requestUrl);
    subwayStationAdaCollection = await response.json();
  } catch {
    console.error("unable to fetch subways station data");
  }
  return subwayStationAdaCollection;
};

export const parseSubwayStationAdaMap = (
  subwayStationAdaCollection: SubwayStationAdaCollection
) =>
  subwayStationAdaCollection.features.reduce(
    (
      subwayStationAdaMap: SubwayStationAdaMap,
      subwayStationAda: SubwayStationAda
    ) => {
      const {
        properties,
        geometry: {
          coordinates: [lng, lat],
        },
      } = subwayStationAda;

      const complexId = properties.complex_id;
      const geoProperties = {
        ...properties,
        lat,
        lng,
      };
      subwayStationAdaMap[complexId] = geoProperties;
      return subwayStationAdaMap;
    },
    {}
  );

const GEOSEARCH_API = "https://geosearch.planninglabs.nyc/v2/autocomplete?text="
export const getGeoSearchResults = async (searchTerm: string): Promise<GeoSearchResults | null> => {
  let searchResults: GeoSearchResults | null = null;
  try {
    const response = await fetch(`${GEOSEARCH_API}${searchTerm}`);
    searchResults = await response.json();
  } catch {
    console.error("unable to fetch geosearch results");
  }
  return searchResults;
}
