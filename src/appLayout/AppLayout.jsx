import styles from "./styles/appLayout.module.scss";

import { Outlet, useLocation } from "react-router";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className={styles["layout-main"]}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
