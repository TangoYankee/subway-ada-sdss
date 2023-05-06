import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import polylabel from "polylabel";
import { useEffect, useState } from "react";
import { Popup, useMap } from "react-map-gl";
import { useDebounce } from "use-debounce";
import { FACTOR_DISPLAY } from "../helpers/constants";
import { LAYER_ID } from "../helpers/MapLayers";
import { TractProperties } from "../types";
import { CENTER_LAT, CENTER_LNG } from "./StationRankingDetailsPopup";

export const TractTotalPopulationPopup = () => {
  const { sdssMap } = useMap();
  const [showPopup, setShowPopup] = useState(false);
  const [debounceShowPopup] = useDebounce(showPopup, 500);
  const [tractProperties, setTractProperites] = useState<TractProperties>(null);
  const [lng, setLng] = useState(CENTER_LNG);
  const [lat, setLat] = useState(CENTER_LAT);

  const updatePopup = (e) => {
    const feature = e.features[0];
    // eslint-disable-next-line
          // @ts-ignore
    const coords = feature.geometry.coordinates as number[][][];
    const _tractProperties = feature.properties as TractProperties;
    const [_lng, _lat] = polylabel(coords, 12);
    if (_lng && _lat && _tractProperties) {
      setLng(_lng);
      setLat(_lat);
      setTractProperites(_tractProperties);
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };
  useEffect(() => {
    if (sdssMap) {
      sdssMap.on("load", () => {
        sdssMap.on("mouseenter", LAYER_ID.TOTAL, updatePopup);

        sdssMap.on("mousemove", LAYER_ID.TOTAL, updatePopup);

        sdssMap.on("mouseleave", LAYER_ID.TOTAL, () => {
          setShowPopup(false);
        });
      });
    }
  }, [sdssMap, setShowPopup]);

  const propertyRows = tractProperties ? (
    Object.entries(tractProperties).map(([property, value], index) => (
      <Tr key={index}>
        <Td>{FACTOR_DISPLAY[property] ?? "Tract Id"}</Td>
        <Td>{value}</Td>
      </Tr>
    ))
  ) : (
    <></>
  );

  return debounceShowPopup && tractProperties ? (
    <Popup
      longitude={lng}
      latitude={lat}
      onClose={() => setShowPopup(false)}
      closeButton={false}
      closeOnClick={false}
      maxWidth="fit-content"
    >
      <TableContainer>
        <Heading size="xs">Census Tract Demographics</Heading>
        <Table size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>{propertyRows}</Tbody>
        </Table>
      </TableContainer>
    </Popup>
  ) : (
    <></>
  );
};
