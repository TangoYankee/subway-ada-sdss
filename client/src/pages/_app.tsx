import { Flex } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { ContentPanelsContext } from "../context/ContentPanelsContext";
import { ContentPanels } from "../types.d";

function MyApp({ Component, pageProps }: AppProps) {
  const [contentPanel, setContentPanel] = useState(ContentPanels.About);
  return (
    <ChakraProvider theme={theme}>
      <ContentPanelsContext.Provider value={{ contentPanel, setContentPanel }}>
        <Flex height="100vh" width="100vw" direction="column">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Flex>
      </ContentPanelsContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
