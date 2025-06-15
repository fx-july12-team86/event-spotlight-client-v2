import { Outlet, useLocation } from "react-router";
import { useEffect, useRef } from "react";

import styles from "./styles/appLayout.module.scss";
import stylesHeader from "../components/header/styles/header.module.scss";

import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";

function AppLayout() {
  const location = useLocation();

  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className={styles["layout"]}>
      <Header headerRef={headerRef} />
      <div className={styles["layout__content"]}>
        <main className={styles["layout__main"]}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
