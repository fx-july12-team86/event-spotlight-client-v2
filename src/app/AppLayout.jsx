import { Outlet } from "react-router";
import Header from "../components/header/Header";
import { useState } from "react";

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
