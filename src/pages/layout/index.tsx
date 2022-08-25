import Header from "components/header";
import Foundation from "pages/foundation";
import * as React from "react";

export interface LayoutProps {}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Header />
      <Foundation />
    </>
  );
}
