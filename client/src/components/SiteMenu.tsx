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
          <MenuOptionGroup
            defaultValue={contentPanel}
            onChange={setContentPanel}
          >
            <MenuItemOption value={ContentPanels.Map}>Map</MenuItemOption>
            <MenuItemOption value={ContentPanels.About}>About</MenuItemOption>
            <MenuItemOption value={ContentPanels.Data}>Factors</MenuItemOption>
            <MenuItemOption value={ContentPanels.Results}>
              Rankings
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};
