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
      height={{
        base: "70vh",
        md: "48rem",
      }}
      w={{
        base: "96vw",
        md: 96,
      }}
      position="absolute"
      top={24}
      left={1.5}
      zIndex="1"
      bg="whiteAlpha.900"
      display={contentPanel === ContentPanels.Map ? "none" : "flex"}
    >
      <AboutPanel shouldDisplay={contentPanel === ContentPanels.About} />
      <DataPanel shouldDisplay={contentPanel === ContentPanels.Data} />
      <ResultsPanel shouldDisplay={contentPanel === ContentPanels.Results} />
    </Flex>
  );
};
