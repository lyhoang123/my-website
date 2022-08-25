import { Box, Image } from "@chakra-ui/react";
import * as React from "react";
import { JsxElement } from "typescript";

export interface LogoProps {
  logo?: string;
  size: string;
}

export default function Logo(props: LogoProps) {
  return (
    <Box>
      <Image
        boxSize={props.size}
        alt="logo"
        objectFit="cover"
        width="64px"
        height="20px"
        src={props.logo}
        color="#fff"
      />
    </Box>
  );
}
