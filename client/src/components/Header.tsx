import { Flex, Heading } from "@chakra-ui/react";
import { SiteMenu } from "./SiteMenu";

export const Header = () => {
  return (
    <Flex w="100%" h="75px">
      <SiteMenu />
      <Flex direction="column">
        <Heading>Subway ADA</Heading>
        <p>Spatial Decision Support System </p>
      </Flex>
    </Flex>
  );
};
