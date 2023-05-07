import {
  Box,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RankingsContext } from "../context/RankingsContext";
import {
  ADA_STATUS,
  RANKING_UNAVAILABLE,
} from "../components/StationRankingDetailsPopup";
import { useMap } from "react-map-gl";
import { SOURCE_ID } from "../helpers/MapLayers";
import {
  Ranking,
  SubwayStationAdaGeoProperties,
  SubwayStationAdaProperties,
} from "../types";
import * as turf from "@turf/turf";
import { uniqueArrayEntries } from "../helpers/utils";
import { METERS_PER_DEG } from "../helpers/constants";

const AMENITIES = [
  SOURCE_ID.HOSPITALS,
  SOURCE_ID.PARKS,
  SOURCE_ID.BUS_STOPS,
  SOURCE_ID.BUS_STOPS_EXPRESS,
  SOURCE_ID.SCHOOLS,
];
const DEFAULT_HIGHLIGHTED_AMENITIES = AMENITIES.reduce(
  (acc, cur): Record<string, Array<unknown>> => {
    acc[cur] = [];
    return acc;
  },
  {}
);

export const StationNeighborhoodPanel = ({
  shouldDisplay,
}: {
  shouldDisplay: boolean;
}) => {
  const { sdssMap } = useMap();
  const { subwayStationAdaMap, rankings, complexId } =
    useContext(RankingsContext);
  const [stationDetails, setStationDetails] =
    useState<SubwayStationAdaGeoProperties>(
      complexId && subwayStationAdaMap ? subwayStationAdaMap[complexId] : null
    );
  const [ranking, setRanking] = useState<Ranking>(
    complexId && rankings ? rankings[complexId] : null
  );
  const [amenities, setAmenities] = useState<
    Record<string, Array<{ id: string; properties: Array<unknown> }>>
  >(DEFAULT_HIGHLIGHTED_AMENITIES);
  const [accessibleNeighbor, setAccessibleNeighbor] = useState(null);

  useEffect(() => {
    const _stationDetails =
      complexId && subwayStationAdaMap ? subwayStationAdaMap[complexId] : null;
    setStationDetails(_stationDetails);
  }, [complexId, subwayStationAdaMap]);

  useEffect(() => {
    const _ranking = complexId && rankings ? rankings[complexId] : null;
    setRanking(_ranking);
  }, [complexId, rankings]);

  useEffect(() => {
    const toggleAmenitiesHighlight = (
      amenities: Record<string, Array<{ id: string }>>,
      highlight: boolean
    ) => {
      Object.entries(amenities).forEach(([source, features]) => {
        features.forEach((feature) => {
          sdssMap.setFeatureState({ source, id: feature.id }, { highlight });
        });
      });
    };
    if (complexId !== null && stationDetails && sdssMap) {
      const { lat, lng } = stationDetails;
      const point = turf.point([lng, lat]);

      // Start nearest accessible station
      const _stations = sdssMap.querySourceFeatures(SOURCE_ID.SUBWAY_STATIONS);
      const stationsUnique = uniqueArrayEntries(_stations);

      const selectedStationLines = stationDetails.lines.split("-");
      const stationsOtherAccessible = stationsUnique.filter((station) => {
        const properties = station.properties as SubwayStationAdaProperties;
        const isOtherStation = properties.complex_id !== complexId;
        const isAccessible = properties.ada_status_code <= 2;

        const targetStationLines = new Set(properties.lines.split("-"));
        const hasCommonLine = selectedStationLines.some((station) =>
          targetStationLines.has(station)
        );
        return isOtherStation && isAccessible && hasCommonLine;
      });
      const nearestAccessibleStation =
        stationsOtherAccessible.length > 0
          ? turf.nearest(point, {
              type: "FeatureCollection",
              // eslint-disable-next-line
          // @ts-ignore
              features: stationsOtherAccessible,
            })
          : null;

      setAccessibleNeighbor((prevAccessibleNeighbor) => {
        if (prevAccessibleNeighbor)
          sdssMap.setFeatureState(
            {
              source: SOURCE_ID.SUBWAY_STATIONS,
              id: prevAccessibleNeighbor.id,
            },
            { highlight: false }
          );
        if (nearestAccessibleStation)
          sdssMap.setFeatureState(
            {
              source: SOURCE_ID.SUBWAY_STATIONS,
              id: nearestAccessibleStation.id,
            },
            { highlight: true }
          );
        return nearestAccessibleStation;
      });
      // End nearest accessible station

      // Start amenities in buffer

      const buffer = turf.buffer(point, 0.005, { units: "degrees" });
      const nextAmenities = {};
      AMENITIES.forEach((source) => {
        const featuresResults = sdssMap.querySourceFeatures(source);
        const featuresUnique = uniqueArrayEntries(featuresResults);
        const featuresIntersecting = featuresUnique.filter((feature) => {
          // eslint-disable-next-line
          // @ts-ignore
          return turf.booleanIntersects(feature, buffer);
        });
        nextAmenities[source] = featuresIntersecting;
      });

      setAmenities((prevAmenities) => {
        toggleAmenitiesHighlight(prevAmenities, false);
        toggleAmenitiesHighlight(nextAmenities, true);
        return nextAmenities;
      });
      // End amenities in buffer
    } else if (complexId === null && sdssMap) {
      setAccessibleNeighbor((accessibleNeighbor) => {
        if (accessibleNeighbor)
          sdssMap.setFeatureState(
            { source: SOURCE_ID.SUBWAY_STATIONS, id: accessibleNeighbor.id },
            { highlight: false }
          );
        return null;
      });

      setAmenities((prevAmenities) => {
        toggleAmenitiesHighlight(prevAmenities, false);
        return DEFAULT_HIGHLIGHTED_AMENITIES;
      });
    }
  }, [sdssMap, stationDetails, complexId]);

  const amenitiesDisplay = Object.entries(amenities).map(
    ([source, features]) => (
      <Box key={source}>
        <Heading as="h5" size="xs">
          {source}
        </Heading>
        <OrderedList>
          {features.map((feature, index) => (
            <ListItem key={index}>
              {Object.values(feature.properties).map((property: string) => (
                <Text key={property}>{property}</Text>
              ))}
            </ListItem>
          ))}
        </OrderedList>
      </Box>
    )
  );
  return (
    <Flex
      h="100%"
      w="100%"
      display={shouldDisplay ? "flex" : "none"}
      direction="column"
      padding="10px"
    >
      <Heading as="h2" size="md">
        Selected Station Details
      </Heading>
      <Box padding={2}>
        {complexId && stationDetails ? (
          <Flex direction="column">
            <Heading as="h3" size="sm">
              {stationDetails.name} on the {stationDetails.lines} Lines
            </Heading>
            <Text>
              Accessiblity Status:{" "}
              <i>{ADA_STATUS[stationDetails.ada_status_code]}</i>
            </Text>
            <Text>
              Annual Ridership: <i>{stationDetails.ridership}</i>
            </Text>
            <Text>
              Betweeness Centrality:{" "}
              <i>{stationDetails.betweenness_centrality}</i>
            </Text>
            {ranking ? (
              <>
                <Text>
                  Batch: <i>{ranking.batch}</i>
                </Text>
                <Text>
                  Ranking: <i>{ranking.ranking}</i>
                </Text>
                <Text>
                  Score: <i>{ranking.score}</i>
                </Text>
              </>
            ) : (
              <Text>
                Rankings: <i>{RANKING_UNAVAILABLE}</i>
              </Text>
            )}
            {accessibleNeighbor ? (
              <>
                <Text>
                  Nearest Accessible Station:{" "}
                  <i>{`${accessibleNeighbor.properties.name} on the ${accessibleNeighbor.properties.lines}`}</i>
                </Text>
                <Text>
                  <i>{`(Distance: ~${(
                    parseFloat(stationDetails.ada_neighbor_gap) * METERS_PER_DEG
                  ).toFixed(0)}m)`}</i>
                </Text>
              </>
            ) : (
              <></>
            )}
            <Heading as="h4" size="xs">
              {`Amentities within ~${(0.005 * METERS_PER_DEG).toFixed(0)}m`}
            </Heading>
            <Text>
              <i>
                Only amenities displayed on the map when the station was
                selected are included
              </i>
            </Text>
            <Flex h="30vh" direction="column" overflow="scroll">
              {amenitiesDisplay}
            </Flex>
          </Flex>
        ) : (
          <Text>Select a station to view its details</Text>
        )}
      </Box>
    </Flex>
  );
};
