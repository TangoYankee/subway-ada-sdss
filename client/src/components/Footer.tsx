import { Center, Link } from "@chakra-ui/react";
export const Footer = () => (
  <Center w="100%" h={10}>
    <Link
      href="https://github.com/TangoYankee/subway-ada-sdss/blob/main/LICENSE"
      isExternal
    >
      {"\u00A9"} 2023 Timothy Miller
    </Link>
  </Center>
);
