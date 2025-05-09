import { Outlet, useLocation } from "react-router";
import { useEffect, useRef } from "react";

import styles from "./styles/appLayout.module.scss";
import stylesHeader from "../components/header/styles/header.module.scss";

import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";

function AppLayout() {
  const location = useLocation();

  const headerRef = useRef(null);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.1,
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     if (!entries[0].isIntersecting) {
  //       headerRef.current.classList.add(stylesHeader["header-sticky"]);
  //     } else {
  //       headerRef.current.classList.remove(stylesHeader["header-sticky"]);
  //     }
  //   }, options);

  //   if (headerRef.current) {
  //     observer.observe(headerRef.current);
  //   }

  //   return () => {
  //     if (headerRef.current) {
  //       observer.unobserve(headerRef.current);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <>
      <Header headerRef={headerRef} />
      <main className={styles["layout-main"]}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
