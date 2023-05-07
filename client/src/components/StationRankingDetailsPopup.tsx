import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Popup, useMap } from "react-map-gl";
import { RankingsContext } from "../context/RankingsContext";
import { LAYER_ID } from "../helpers/MapLayers";
import { SubwayStationAdaProperties } from "../types";

export const ADA_STATUS = [
  "Full",
  "Partial",
  "Construction in progress",
  "Under consideration",
  "No funding plans",
];

export const RANKING_UNAVAILABLE = "Not ranked";
export const CENTER_LNG = -74;
export const CENTER_LAT = 40.74;
export const StationRankingDetailsPopup = () => {
  const { sdssMap } = useMap();
  const [showPopup, setShowpopup] = useState(false);
  const [longitude, setLongitude] = useState(CENTER_LNG);
  const [latitude, setLatitude] = useState(CENTER_LAT);
  const { subwayStationAdaMap, complexId, setComplexId } =
    useContext(RankingsContext);
  const [station, setStation] = useState<SubwayStationAdaProperties | null>(
    null
  );

  useEffect(() => {
    if (sdssMap) {
      sdssMap.on("load", () => {
        sdssMap.on("click", LAYER_ID.SUBWAY_STATION_ADA_CODE, (e) => {
          const feature = e.features[0];
          if (feature?.properties.complex_id) {
            setComplexId(feature.properties.complex_id as string);
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
  }, [sdssMap, setComplexId, setShowpopup]);

  useEffect(() => {
    let _station = null;
    if (complexId) {
      if (subwayStationAdaMap) _station = subwayStationAdaMap[complexId];
    }

    setShowpopup(complexId ? true : false);
    setStation(_station);

    const _latitude = _station ? _station.lat : CENTER_LAT;
    setLatitude(_latitude);

    const _longitude = _station ? _station.lng : CENTER_LNG;
    setLongitude(_longitude);
  }, [subwayStationAdaMap, complexId]);

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
        <Flex direction="column">
          <Heading size="xs">{`${station.name} Station`}</Heading>
          <Text>{`${station.lines} lines`}</Text>
        </Flex>
      ) : (
        <Box>Station data unavailable</Box>
      )}
    </Popup>
  ) : (
    <></>
  );
};
