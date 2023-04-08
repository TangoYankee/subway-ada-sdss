import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useMap } from "react-map-gl";

interface LayerCardProps {
  addToLoadedSources: () => void;
  isSourceLoaded: boolean;
  shouldWeight: boolean;
  weight: number;
  updateShouldWeight: (shouldWeight: boolean) => void;
  updateWeight: (Weighting: number) => void;
  layerId: string;
  children: React.ReactNode;
}

export const LayerCard = ({
  children,
  addToLoadedSources,
  shouldWeight,
  weight,
  updateShouldWeight,
  updateWeight,
  isSourceLoaded,
  layerId,
}: LayerCardProps) => {
  const { sdssMap } = useMap();
  const [showTooltip, setShowTooltip] = useState(false);

  const setShouldWeight = (e: ChangeEvent<HTMLInputElement>) =>
    updateShouldWeight(e.target.checked);

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
          <Flex>
            <Flex direction="column" flex={1}>
              <Checkbox onChange={setShouldWeight} isChecked={shouldWeight}>
                Weighting
              </Checkbox>
              <Box width="90%">
                <Slider
                  value={weight}
                  min={0}
                  max={100}
                  // TODO: debounce updating the weight
                  onChange={updateWeight}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    placement="top"
                    isOpen={showTooltip}
                    label={`${weight / 100}`}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
              </Box>
            </Flex>
            <Flex direction="column" flex={1}>
              <Checkbox
                onChange={setLayerVisibility}
                defaultChecked={isSourceLoaded}
              >
                Display
              </Checkbox>
              <Text>Symbols TBD</Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
