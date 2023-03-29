import { Flex, Heading, Text } from "@chakra-ui/react";
import { SiteMenu } from "./SiteMenu";

export const Header = () => {
  return (
    <Flex w="100%" h={20}>
      <Flex w={80} justifyContent="space-around" alignItems="center">
        <SiteMenu />
        <Flex direction="column" alignItems={"center"}>
          <Heading>Subway ADA</Heading>
          <Text fontSize="sm">Spatial Decision Support System</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
