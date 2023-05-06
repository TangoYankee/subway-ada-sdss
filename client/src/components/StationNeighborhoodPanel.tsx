import { Box, Flex, Heading, Text } from "@chakra-ui/react";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [highlightedFeatures, setHighlightedFeatures] = useState({
    [SOURCE_ID.HOSPITALS]: [],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [amentities, setAmenities] = useState({
    [SOURCE_ID.HOSPITALS]: [],
  });
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
    if (stationDetails && sdssMap) {
      const { lat, lng } = stationDetails;
      const point = turf.point([lng, lat]);
      const buffer = turf.buffer(point, 0.005, { units: "degrees" });
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
      const nearestAccessibleStation = turf.nearest(point, {
        type: "FeatureCollection",
        // eslint-disable-next-line
          // @ts-ignore
        features: stationsOtherAccessible,
      });
      const _hospitals = sdssMap.querySourceFeatures(SOURCE_ID.HOSPITALS);
      const hospitalsUnique = uniqueArrayEntries(_hospitals);
      const hospitalsIntersecting = hospitalsUnique.filter((hospital) =>
        // eslint-disable-next-line
      // @ts-ignore
        turf.booleanIntersects(hospital, buffer)
      );
      setAmenities({ [SOURCE_ID.HOSPITALS]: hospitalsIntersecting });
      const hospitalsIntersectingIds = hospitalsIntersecting.map(
        (hospital) => hospital.id
      );

      setHighlightedFeatures((highlightedFeatures) => {
        const prevHospitalsIntersectingIds =
          highlightedFeatures[SOURCE_ID.HOSPITALS];
        prevHospitalsIntersectingIds.forEach((id) => {
          sdssMap.setFeatureState(
            { source: SOURCE_ID.HOSPITALS, id: id },
            { highlight: false }
          );
        });
        hospitalsIntersectingIds.forEach((id) => {
          sdssMap.setFeatureState(
            { source: SOURCE_ID.HOSPITALS, id: id },
            { highlight: true }
          );
        });
        return { [SOURCE_ID.HOSPITALS]: hospitalsIntersectingIds };
      });

      setAccessibleNeighbor((accessibleNeighbor) => {
        sdssMap.setFeatureState(
          { source: SOURCE_ID.SUBWAY_STATIONS, id: accessibleNeighbor.id },
          { highlight: false }
        );
        sdssMap.setFeatureState(
          {
            source: SOURCE_ID.SUBWAY_STATIONS,
            id: nearestAccessibleStation.id,
          },
          { highlight: true }
        );
        return nearestAccessibleStation;
      });
    }
  }, [
    sdssMap,
    stationDetails,
    complexId,
    setHighlightedFeatures,
    setAccessibleNeighbor,
  ]);

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
              Accessiblity Status: {ADA_STATUS[stationDetails.ada_status_code]}
            </Text>
            <Text>Annual Ridership: {stationDetails.ridership}</Text>
            <Text>
              Betweeness Centrality: {stationDetails.betweenness_centrality}
            </Text>
            {ranking ? (
              <>
                <Text>Batch: {ranking.batch}</Text>
                <Text>Ranking: {ranking.ranking}</Text>
                <Text>Score: {ranking.score}</Text>
              </>
            ) : (
              <Text>Rankings: {RANKING_UNAVAILABLE}</Text>
            )}
            <Text>
              Nearest Accessible Station: {accessibleNeighbor.properties.name}{" "}
              on the {accessibleNeighbor.properties.lines}
            </Text>
            <Text>Amentities within 500m</Text>
            <Text>
              Hospitals:{" "}
              {/* {amentities[SOURCE_ID.HOSPITALS][0].properties.facility_name} */}
            </Text>
          </Flex>
        ) : (
          <Text>Select a station to view its details</Text>
        )}
      </Box>
    </Flex>
  );
};
