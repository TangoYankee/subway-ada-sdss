import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ContentPanelsContext } from "../context/ContentPanelsContext";
import { ContentPanels } from "../types.d";

export const SiteMenu = () => {
  const { contentPanel, setContentPanel } = useContext(ContentPanelsContext);

  const seeChange = (value: ContentPanels) => {
    console.log("see the change is", value);
    console.log(typeof value);
    setContentPanel(value);
  };

  return (
    <Box zIndex={2}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuOptionGroup defaultValue={contentPanel} onChange={seeChange}>
            <MenuItemOption value={ContentPanels.Map}>Map</MenuItemOption>
            <MenuItemOption value={ContentPanels.About}>About</MenuItemOption>
            <MenuItemOption value={ContentPanels.Data}>Data</MenuItemOption>
            <MenuItemOption value={ContentPanels.Results}>
              Results
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};
