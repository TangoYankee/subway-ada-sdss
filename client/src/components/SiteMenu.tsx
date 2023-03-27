import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";

export const SiteMenu = () => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<HamburgerIcon />}
      variant="outline"
    />
    <MenuList>
      <MenuOptionGroup defaultValue="map">
        <MenuItemOption value="map">Map</MenuItemOption>
        <MenuItemOption value="about">About</MenuItemOption>
        <MenuItemOption value="data">Data</MenuItemOption>
        <MenuItemOption value="results">Results</MenuItemOption>
      </MenuOptionGroup>
    </MenuList>
  </Menu>
);
