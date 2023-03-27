import { Flex } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh" width="100vw" direction="column">
        <Header />
        <Component {...pageProps} />
        <Footer/>
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
