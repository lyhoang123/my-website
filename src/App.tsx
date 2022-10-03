import { ChakraProvider, theme } from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Authentication from "pages/auth";
import Layout from "pages/layout";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { firebaseConfig } from "firebases";

firebase.initializeApp(firebaseConfig);
// import Header from "./components/header";

export const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          return;
        }
        const tokenID = await user.getIdToken();
        setToken(tokenID);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {!token.length ? <Authentication /> : <Layout />}
      </BrowserRouter>
    </ChakraProvider>
  );
};
