import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { ContentPanelsContext } from "../context/ContentPanelsContext";
import { ContentPanels } from "../types.d";
import { AboutPanel } from "./AboutPanel";
import { DataPanel } from "./DataPanel";
import { ResultsPanel } from "./ResultsPanel";

export const ContentPanel = () => {
  const { contentPanel } = useContext(ContentPanelsContext);

  return (
    <Flex
      h="635px"
      w="350px"
      position="absolute"
      top="83px"
      left="6px"
      zIndex="1"
      display={contentPanel === ContentPanels.Map ? "none" : "flex"}
    >
      <AboutPanel shouldDisplay={contentPanel === ContentPanels.About} />
      <DataPanel shouldDisplay={contentPanel === ContentPanels.Data} />
      <ResultsPanel shouldDisplay={contentPanel === ContentPanels.Results} />
    </Flex>
  );
};
