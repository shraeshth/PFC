import React from "react";
import Navbar from "../components/Navbar";
import FooterText from "../components/FooterText";
import { Outlet } from "react-router-dom";
import CubertoCursor from "../components/CubertoCursor";

function Layout() {
  return (
    <>
      <CubertoCursor />
      <Navbar />
      <Outlet />
      <FooterText />
    </>
  );
}

export default Layout;
