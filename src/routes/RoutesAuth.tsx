import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES_AUTH } from "./routes";

export interface RoutesAuthProps {}

export default function RoutesAuth(props: RoutesAuthProps) {
  return (
    <Routes>
      {Object.entries(ROUTES_AUTH).map(([key, config]) => {
        const { path, Component } = config;
        return <Route key={key} path={path} element={<Component />} />;
      })}
    </Routes>
  );
}
