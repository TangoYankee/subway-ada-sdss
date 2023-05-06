import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RankingsContext } from "../context/RankingsContext";
import {
  ADA_STATUS,
  RANKING_UNAVAILABLE,
} from "../components/StationRankingDetailsPopup";
import { useMap } from "react-map-gl";
import { SOURCE_ID } from "../helpers/MapLayers";
import { Ranking, SubwayStationAdaGeoProperties } from "../types";
import * as turf from "@turf/turf";

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
  const [amentities, setAmenities] = useState({
    [SOURCE_ID.HOSPITALS]: [],
  });

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
      turf.point([lng, lat]);
      const point = turf.point([lng, lat]);
      const buffer = turf.buffer(point, 0.005, { units: "degrees" });
      const _hospitals = sdssMap.querySourceFeatures(SOURCE_ID.HOSPITALS);
      const hospitalsUnique = _hospitals.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );

      const hospitalsIntersecting = hospitalsUnique.filter((hospital) =>
        // eslint-disable-next-line
      // @ts-ignore
        turf.booleanIntersects(hospital, buffer)
      );
      setAmenities({ [SOURCE_ID.HOSPITALS]: hospitalsIntersecting });
      const hospitalsIntersectingIds = hospitalsIntersecting.map(
        (hospital) => hospital.id
      );
      console.log("ids", hospitalsIntersectingIds);

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
        console.log("prev Ids", prevHospitalsIntersectingIds);
        return { [SOURCE_ID.HOSPITALS]: hospitalsIntersectingIds };
      });
    }
  }, [sdssMap, stationDetails, setHighlightedFeatures]);

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
            <Heading as="h3" size="sm">
              Nearest Accessible Station
            </Heading>
            <Text>Amentities within 500m</Text>
            <Text>
              Hospitals:{" "}
              {amentities[SOURCE_ID.HOSPITALS][0].properties.facility_name}
            </Text>
          </Flex>
        ) : (
          <Text>Select a station to view its details</Text>
        )}
      </Box>
    </Flex>
  );
};
