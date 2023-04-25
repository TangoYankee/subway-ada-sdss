import { useContext } from "react";
import { Marker } from "react-map-gl";
import { CitySearchContext } from "../context/CitySearchContext";

export const CitySearchMarker = () => {
  const { selectedResultGeo } = useContext(CitySearchContext);

  if (selectedResultGeo === null) return <></>;
  return (
    <Marker
      latitude={selectedResultGeo.lat}
      longitude={selectedResultGeo.lng}
      color="#FF0000"
    ></Marker>
  );
};
