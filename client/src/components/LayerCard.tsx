import { Card, CardBody, Checkbox, Flex } from "@chakra-ui/react";
import { ChangeEvent, Children, useEffect } from "react";
import { useMap } from "react-map-gl";

interface LayerCardProps {
  addToLoadedSources: () => void;
  isSourceLoaded: boolean;
  layerId: string;
  children: React.ReactNode;
}

export const LayerCard = ({
  children,
  addToLoadedSources,
  isSourceLoaded,
  layerId,
}: LayerCardProps) => {
  const { sdssMap } = useMap();

  const setLayerVisibility = (e: ChangeEvent<HTMLInputElement>) => {
    const map = sdssMap.getMap();
    const isChecked = e.target.checked;
    if (isChecked) {
      if (!isSourceLoaded) {
        addToLoadedSources();
      } else {
        map.setLayoutProperty(layerId, "visibility", "visible");
      }
    } else {
      if (!isChecked && isSourceLoaded) {
        map.setLayoutProperty(layerId, "visibility", "none");
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <Flex direction="column">
          {children}
          <Checkbox onChange={setLayerVisibility} defaultChecked={isSourceLoaded}>Show</Checkbox>
        </Flex>
      </CardBody>
    </Card>
  );
};
