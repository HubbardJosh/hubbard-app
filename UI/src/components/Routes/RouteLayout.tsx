import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";

export function RouteLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
