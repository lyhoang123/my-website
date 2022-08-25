import { Box, Container, Stack, useColorModeValue } from "@chakra-ui/react";

import BackgroundRandom from "components/background";
import RoutesAuth from "routes/RoutesAuth";

export interface AuthenticationProps {}

export default function Authentication(props: AuthenticationProps) {
  return (
    <Box>
      <BackgroundRandom />
      <Container
        maxW="lg"
        h="100vh"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
        bg={useColorModeValue("md", "md-dark")}
        position={"relative"}
        display={"flex"}
        alignItems={"center"}
      >
        <Stack spacing="8" w={"100%"}>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={"#fff"}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <RoutesAuth />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
