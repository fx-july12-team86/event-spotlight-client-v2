import { Link } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/header.module.scss";
import Geolocation from "./Geolocation/Geolocation";
import AccountMenu from "./AccountMenu/AccountMenu";
import SearchEvent from "./SearchEvent/SearchEvent";
import SetCity from "./SetCity/SetCity";
import SetDateComp from "./SetDateComp/SetDateComp";
import Authentication from "./Authentication/Authentication";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Header() {
  const [isHiddenGeo, setIsHiddenGeo] = useState(true);
  const [isHiddenCalendar, setIsHiddedCalendar] = useState(true);
  const [isHiddenAccountMenu, setIsHiddenAccountMenu] = useState(true);
  const [isHiddenSearchInput, setIsHiddedSearchInput] = useState(true);
  const [isHiddenLogin, setIsHiddenLogin] = useState(true);

  const { city } = useSelector((store) => store.city);

  function handleToggleChangeGeo() {
    setIsHiddenGeo(!isHiddenGeo);
  }

  function handleToggleCalendar() {
    if (!isHiddenAccountMenu) {
      setIsHiddenAccountMenu((isHiddenAccountMenu) => !isHiddenAccountMenu);
    }
    setIsHiddedCalendar((isHiddenCalendar) => !isHiddenCalendar);
  }

  function handleToggleAccountMenu() {
    if (!isHiddenCalendar) {
      setIsHiddedCalendar((isHiddenCalendar) => !isHiddenCalendar);
    }
    setIsHiddenAccountMenu(!isHiddenAccountMenu);
  }
  function handleToggleSearchInput() {
    setIsHiddedSearchInput((isHiddenSearchInput) => !isHiddenSearchInput);
  }

  function handleToggleLogin() {
    setIsHiddenLogin((isHiddenLogin) => !isHiddenLogin);
    if (!isHiddenAccountMenu) {
      handleToggleAccountMenu();
    }
  }

  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header__box-left"]}>
          <Link
            to="/"
            className={styles["header__box-left__logo"]}>
            EventSpotlight
          </Link>
          <span
            className={`${styles["header__box-left__geolocation"]} ${
              !isHiddenGeo
                ? styles["header__box-left__geolocation__isActive"]
                : ""
            }`}
            onClick={handleToggleChangeGeo}>
            {city}
          </span>
          <Geolocation
            isHidden={isHiddenGeo}
            onSetIsHiddenGeo={setIsHiddenGeo}
          />
        </div>
        <div className={styles["header__box-right"]}>
          <button
            className={styles["header__box-right__search"]}
            onClick={handleToggleSearchInput}
            disabled={!isHiddenSearchInput}
            style={{ display: `${!isHiddenSearchInput ? "none" : ""}` }}>
            <svg
              className={`${styles["svgSizeNormalize"]} ${styles["svgFill"]}`}>
              <use
                href={` ${BASE_URL}/icons/Header/navBar/icons.svg#search`}></use>
            </svg>
          </button>
          {isHiddenSearchInput || (
            <SearchEvent handleClickCross={handleToggleSearchInput} />
          )}
          <button
            className={`${styles["header__box-right__calendar"]} ${
              !isHiddenCalendar
                ? styles["header__box-right__calendar__isActive"]
                : ""
            }`}
            onClick={handleToggleCalendar}>
            <svg
              className={`${styles["svgSizeNormalize"]} ${styles["svgFill"]}`}>
              <use
                href={` ${BASE_URL}/icons/Header/navBar/icons.svg#calendar`}></use>
            </svg>
          </button>
          <button
            className={`${styles["header__box-right__account"]} ${
              !isHiddenAccountMenu
                ? styles["header__box-right__account__isActive"]
                : ""
            }`}
            onClick={handleToggleAccountMenu}>
            <svg
              className={`${styles["svgSizeNormalize"]} ${styles["svgFill"]}`}>
              <use
                href={` ${BASE_URL}/icons/Header/navBar/icons.svg#account`}></use>
            </svg>
          </button>
          <button className={styles["header__box-right__addEvent"]}>
            Додати подію
          </button>
        </div>
      </header>
      <SetDateComp isHidden={isHiddenCalendar} />
      <AccountMenu
        isHidden={isHiddenAccountMenu}
        onHandleToggleLogin={handleToggleLogin}
      />
      <SetCity />
      <Authentication
        isHidden={isHiddenLogin}
        onHandleToggleLogin={handleToggleLogin}
      />
    </>
  );
}

export default Header;
