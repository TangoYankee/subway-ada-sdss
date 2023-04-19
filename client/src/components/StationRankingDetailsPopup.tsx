import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Popup, useMap } from "react-map-gl";
import { RankingsContext } from "../context/RankingsContext";
import { FACTORS } from "../helpers/constants";
import { LAYER_ID } from "../helpers/MapLayers";
import { Ranking } from "../types";

const ADA_STATUS = ["Full", "Partial", "Construction in progress", "Under consideration", "No funding plans"]
export const StationRankingDetailsPopup = () => {
  const { sdssMap } = useMap();
  const [showPopup, setShowpopup] = useState(false);
  const [longitude, setLongtitude] = useState(-74.0);
  const [latitude, setLatitude] = useState(40.74);
  const { rankings, subwayStationAdaMap } = useContext(RankingsContext);
  const [complexId, setComplexId] = useState<string | null>(null);
  const [  ranking, setRanking ] = useState<Ranking | null>(null);

  sdssMap.on("load", () => {
    sdssMap.on("click", LAYER_ID.SUBWAY_STATION_LOCATION, (e) => {
      const { lat, lng } = e.lngLat;
      setLongtitude(lng);
      setLatitude(lat);
      const feature = e.features[0];
      if (feature?.id) {
        setComplexId(feature.id as string);
      }
      setShowpopup(true);
    });

    sdssMap.on("mouseenter", LAYER_ID.SUBWAY_STATION_LOCATION, () => {
      sdssMap.getCanvas().style.cursor = "pointer";
    });

    sdssMap.on("mouseleave", LAYER_ID.SUBWAY_STATION_LOCATION, () => {
      sdssMap.getCanvas().style.cursor = "";
    });
  });

  useEffect(()=> {
    if(rankings && complexId){
      setRanking(rankings[complexId]);
    }
  }, [rankings, complexId])

  const onPopupClose = () => {
    setShowpopup(false);
    setComplexId(null);
    setRanking(null);
  }

  return showPopup ? (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={onPopupClose}
      maxWidth="fit-content"
    >{ranking ?
      <TableContainer>
        <Heading size='xs'>
          { `${ranking.name} Station on ${ranking.lines} lines` }
        </Heading>
        <Table size='sm' variant='striped'>
          <Thead>
            <Tr>
              <Th>Factor</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>ADA Status</Td>
              <Td>{ADA_STATUS[ranking.ada_status_code]}</Td>
            </Tr>
            <Tr>
              <Td>Score</Td>
              <Td>{(ranking.score*100).toFixed(0)}%</Td>
            </Tr>
            <Tr>
              <Td>Ranking</Td>
              <Td>{ranking.ranking}</Td>
            </Tr>
            <Tr>
              <Td>Batch</Td>
              <Td>{ranking.batch}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer> :
      <Box>This station is already accessible</Box>
    }
    </Popup>
  ) : (
    <></>
  );
};
