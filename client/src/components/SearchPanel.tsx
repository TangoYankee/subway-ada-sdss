import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { getGeoSearchResults } from "../helpers/utils";
import { useDebounce } from "use-debounce";
import { GeoSearchFeatures, SubwayStationAdaProperties } from "../types";
import { Point } from "geojson";
import { CitySearchContext } from "../context/CitySearchContext";
import { RankingsContext } from "../context/RankingsContext";

export const SearchPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<GeoSearchFeatures | null>(
    null
  );
  const [stationAdaSearch, setStationAdaSearch] =
    useState<Array<SubwayStationAdaProperties> | null>(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const { subwayStationAdaMap, setComplexId } = useContext(RankingsContext);
  const { setSelectedResultGeo } = useContext(CitySearchContext);

  const onChangeSearchTerm = async (e: ChangeEvent<HTMLInputElement>) => {
    const _value = e.target.value;
    setSearchTerm(_value);
    if (_value === "") setSelectedResultGeo(null);
  };

  const updateSelectedResultGeo = (point: Point) => {
    if (point) {
      const {
        coordinates: [lng, lat],
      } = point;
      setSelectedResultGeo({ lat, lng });
    } else {
      setSelectedResultGeo(null);
    }
  };

  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm !== "") {
        const _searchResults = await getGeoSearchResults(debouncedSearchTerm);
        const resultFeatues = _searchResults.features;
        setSearchResults(resultFeatues);
      } else {
        setSearchResults(null);
      }
    })();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (subwayStationAdaMap) {
      if (debouncedSearchTerm) {
        const term = debouncedSearchTerm.toLowerCase();
        const stations = Object.values(subwayStationAdaMap);
        const _stationAdaSearch = stations.filter((station) => {
          const name = station.name.toLowerCase();
          return name.includes(term);
        });
        setStationAdaSearch(_stationAdaSearch.slice(0, 5));
      } else {
        setStationAdaSearch(null);
      }
    }
  }, [debouncedSearchTerm, subwayStationAdaMap, setStationAdaSearch]);

  return (
    <Flex
      h="100%"
      w="100%"
      display={shouldDisplay ? "flex" : "none"}
      direction="column"
      padding="10px"
    >
      <Heading as="h2" size="md">
        City Search
      </Heading>
      <Box padding={2}>
        <Input
          placeholder="Search"
          size="lg"
          value={searchTerm}
          onChange={onChangeSearchTerm}
        ></Input>
        <Flex direction="column">
          <Flex direction="column" flex={1}>
            <Heading as="h3" size="sm">
              Stations
            </Heading>
            {stationAdaSearch !== null ? (
              <Flex
                direction="column"
                padding={2}
                overflow="scroll"
                height="20vh"
                onMouseLeave={() => setComplexId(null)}
              >
                {stationAdaSearch.map((station) => (
                  <Flex
                    key={station.complex_id}
                    direction="column"
                    padding={0.5}
                    border="solid"
                    borderStyle="solid"
                    borderWidth={1}
                    borderRadius="5"
                    onMouseEnter={() => setComplexId(station.complex_id)}
                    _hover={{ cursor: "pointer", borderWidth: 2 }}
                  >
                    <Text>{station.name} station,</Text>
                    <Text>{station.lines} lines</Text>
                  </Flex>
                ))}
              </Flex>
            ) : (
              <></>
            )}
          </Flex>
          <Flex direction="column">
            <Heading as="h3" size="sm">
              Places
            </Heading>
            {searchResults !== null ? (
              <Flex
                direction="column"
                padding={2}
                overflow="scroll"
                height="20vh"
                onMouseLeave={() => updateSelectedResultGeo(null)}
              >
                {searchResults.map((result) => (
                  <Flex
                    key={result.properties.id}
                    direction="column"
                    padding={0.5}
                    border="solid"
                    borderStyle="solid"
                    borderWidth={1}
                    borderRadius="5"
                    onMouseEnter={() =>
                      updateSelectedResultGeo(result.geometry)
                    }
                    _hover={{
                      cursor: "pointer",
                      borderWidth: 2,
                    }}
                  >
                    <Text>{result.properties.name}</Text>
                    <Text>
                      {result.properties.neighbourhood},{" "}
                      {result.properties.borough}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
