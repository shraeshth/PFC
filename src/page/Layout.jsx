import React from "react";
import Navbar from "../components/Navbar";
import FooterText from "../components/FooterText";
import CubertoCursor from "../components/CubertoCursor";
import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <CubertoCursor />
      <Navbar />
      <Outlet />
      <FooterText />
    </>
  );
}
