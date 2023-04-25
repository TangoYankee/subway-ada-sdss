import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Popup, useMap } from "react-map-gl";
import { RankingsContext } from "../context/RankingsContext";
import { LAYER_ID } from "../helpers/MapLayers";
import { Ranking, SubwayStationAdaProperties } from "../types";

const ADA_STATUS = [
  "Full",
  "Partial",
  "Construction in progress",
  "Under consideration",
  "No funding plans",
];

const RANKING_UNAVAILABLE = "Not ranked";
const CENTER_LNG = -74;
const CENTER_LAT = 40.74;
export const StationRankingDetailsPopup = () => {
  const { sdssMap } = useMap();
  const [showPopup, setShowpopup] = useState(false);
  const [longitude, setLongitude] = useState(CENTER_LNG);
  const [latitude, setLatitude] = useState(CENTER_LAT);
  const { rankings, subwayStationAdaMap, complexId, setComplexId } =
    useContext(RankingsContext);
  const [ranking, setRanking] = useState<Ranking | null>(null);
  const [station, setStation] = useState<SubwayStationAdaProperties | null>(
    null
  );

  useEffect(() => {
    if (sdssMap) {
      sdssMap.on("load", () => {
        sdssMap.on("click", LAYER_ID.SUBWAY_STATION_ADA_CODE, (e) => {
          const feature = e.features[0];
          if (feature?.id) {
            setComplexId(feature.id as string);
          }
          setShowpopup(true);
        });

        sdssMap.on("mouseenter", LAYER_ID.SUBWAY_STATION_ADA_CODE, () => {
          sdssMap.getCanvas().style.cursor = "pointer";
        });

        sdssMap.on("mouseleave", LAYER_ID.SUBWAY_STATION_ADA_CODE, () => {
          sdssMap.getCanvas().style.cursor = "";
        });
      });
    }
  }, [sdssMap, setComplexId]);

  useEffect(() => {
    let _ranking = null;
    let _station = null;
    if (complexId) {
      if (rankings) _ranking = rankings[complexId];
      if (subwayStationAdaMap) _station = subwayStationAdaMap[complexId];
    }

    setShowpopup(complexId ? true : false);
    setRanking(_ranking);
    setStation(_station);

    const _latitude = _station ? _station.lat : CENTER_LAT;
    setLatitude(_latitude);

    const _longitude = _station ? _station.lng : CENTER_LNG;
    setLongitude(_longitude);
  }, [subwayStationAdaMap, rankings, complexId]);

  const onPopupClose = () => {
    setShowpopup(false);
    setComplexId(null);
  };

  return showPopup ? (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={onPopupClose}
      maxWidth="fit-content"
    >
      {station ? (
        <TableContainer>
          <Heading size="xs">
            {`${station.name} Station on ${station.lines} lines`}
          </Heading>
          <Table size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>Factor</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>ADA Status</Td>
                <Td>{ADA_STATUS[station.ada_status_code]}</Td>
              </Tr>
              <Tr>
                <Td>Score</Td>
                <Td>
                  {ranking
                    ? `${(ranking.score * 100).toFixed(0)}%`
                    : RANKING_UNAVAILABLE}
                </Td>
              </Tr>
              <Tr>
                <Td>Ranking</Td>
                <Td>{ranking ? ranking.ranking : RANKING_UNAVAILABLE}</Td>
              </Tr>
              <Tr>
                <Td>Phase</Td>
                <Td>{ranking ? ranking.batch + 1 : RANKING_UNAVAILABLE}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box>Station data unavailable</Box>
      )}
    </Popup>
  ) : (
    <></>
  );
};
