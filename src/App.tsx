import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import Authentication from "pages/auth";
import Login from "pages/auth/login";
import Layout from "pages/layout";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// import Header from "./components/header";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ChakraProvider>
);
