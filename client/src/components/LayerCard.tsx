import { Card, CardBody, Checkbox, Flex } from "@chakra-ui/react";
import { ChangeEvent, useEffect } from "react";
import { useMap } from "react-map-gl";

export const LayerCard = () => {
  const { sdssMap } = useMap();

  useEffect(() => {
    console.log("sdss map", sdssMap);
    if (sdssMap !== undefined) {
      sdssMap.on("load", () => {
        console.log("map!");
        const vis = sdssMap.getLayoutProperty(
          "bus-routes-express",
          "visibility"
        );
        console.log("vis", vis);
      });
    }
  }, [sdssMap]);

  const setLayerVisibility = (e: ChangeEvent<HTMLInputElement>) => {
    const source = sdssMap.getSource("bus-routes-express");
    // const layer = sdssMap.getLayer('bus-routes-express');
    // const layerVis = sdssMap.getLayoutProperty('bus-routes-express', 'visibility');

    const map = sdssMap.getMap();
    const layerVis = map.getLayoutProperty("bus-routes-express", "visibility");
    console.log("source", source);
    console.log("layerVis", layerVis);
    console.log("e", e);
    const nextVisibility = e.target.checked ? "visible" : "none";
    // sdssMap.setLayoutProperty('bus-routes-express', nextVisibility);
    map.setLayoutProperty("bus-routes-express", "visibility", nextVisibility);
  };

  return (
    <Card>
      <CardBody>
        <Flex direction="column">
          Express Bus Routes
          <Checkbox onChange={setLayerVisibility} defaultChecked>
            Show
          </Checkbox>
        </Flex>
      </CardBody>
    </Card>
  );
};
