import { Card, CardBody, Checkbox, Flex } from "@chakra-ui/react";
import { ChangeEvent, useEffect } from "react";
import { useMap } from "react-map-gl";

interface LayerCardProps {
  addToLoadedSources: (source: string) => void;
  isSourceLoaded: boolean;
}

export const LayerCard = ({ addToLoadedSources, isSourceLoaded }: LayerCardProps) => {
  const { sdssMap } = useMap();

  useEffect(() => {
    console.log("sdss map", sdssMap);
    if (sdssMap !== undefined) {
      sdssMap.on("load", () => {
        console.log("map!");
        // const vis = sdssMap.getLayoutProperty(
        //   "bus-routes-express",
        //   "visibility"
        // );
        // console.log("vis", vis);
      });
    }
  }, [sdssMap]);

  const setLayerVisibility = (e: ChangeEvent<HTMLInputElement>) => {
    // const layer = sdssMap.getLayer('bus-routes-express');
    // const layerVis = sdssMap.getLayoutProperty('bus-routes-express', 'visibility');

    const map = sdssMap.getMap();
    const isChecked = e.target.checked;
    if(isChecked){
      if(!isSourceLoaded) {
        addToLoadedSources("bus-routes-express");
      } else {
      const layerVis = map.getLayoutProperty("bus-routes-express", "visibility");
      console.log("layerVis", layerVis);
      console.log("e", e);
      const nextVisibility = isChecked ? "visible" : "none";
      console.log('isChecked', isChecked);
      map.setLayoutProperty("bus-routes-express", "visibility", "visible");
      }
    } else {
      if(!isChecked && isSourceLoaded) {
        const layerVis = map.getLayoutProperty("bus-routes-express", "visibility");
        console.log("layerVis", layerVis);
        map.setLayoutProperty("bus-routes-express", "visibility", "none");
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <Flex direction="column">
          Express Bus Routes
          <Checkbox onChange={setLayerVisibility}>Show</Checkbox>
        </Flex>
      </CardBody>
    </Card>
  );
};
