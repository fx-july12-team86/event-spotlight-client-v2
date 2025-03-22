import styles from "./styles/appLayout.module.scss";

import { Outlet } from "react-router";
import Header from "../components/header/Header";
import { useState } from "react";
import Footer from "../components/Footer/Footer";

function AppLayout() {
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
