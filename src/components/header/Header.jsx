import { Link } from "react-router";
import styles from "./styles/header.module.scss";
import Geolocation from "./Geolocation";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import SearchEvent from "./SearchEvent";
import SetCity from "./SetCity";
import SetDateComp from "./SetDateComp";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Header() {
  const [isHiddenGeo, setIsHiddenGeo] = useState(true);
  const [isHiddenCalendar, setIsHiddedCalendar] = useState(true);
  const [isHiddenAccountMenu, setIsHiddenAccountMenu] = useState(true);
  const [isHiddenSearchInput, setIsHiddedSearchInput] = useState(true);

  const { city } = useSelector((store) => store.city);
  function handleOpenChangleGeo() {
    setIsHiddenGeo(!isHiddenGeo);
  }

  function handleOpenCalendar() {
    if (!isHiddenAccountMenu) {
      setIsHiddenAccountMenu((isHiddenAccountMenu) => !isHiddenAccountMenu);
    }
    setIsHiddedCalendar((isHiddenCalendar) => !isHiddenCalendar);
  }

  function handleOpenAccountMenu() {
    if (!isHiddenCalendar) {
      setIsHiddedCalendar((isHiddenCalendar) => !isHiddenCalendar);
    }
    setIsHiddenAccountMenu(!isHiddenAccountMenu);
  }
  function handleOpenSearchInput() {
    setIsHiddedSearchInput((isHiddenSearchInput) => !isHiddenSearchInput);
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
            onClick={handleOpenChangleGeo}>
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
            onClick={handleOpenSearchInput}
            disabled={!isHiddenSearchInput}
            style={{ display: `${!isHiddenSearchInput ? "none" : ""}` }}>
            <svg
              className={`${styles["svgSizeNormalize"]} ${styles["svgFill"]}`}>
              <use
                href={` ${BASE_URL}/icons/Header/navBar/icons.svg#search`}></use>
            </svg>
          </button>
          {isHiddenSearchInput || (
            <SearchEvent handleClickCross={handleOpenSearchInput} />
          )}
          <button
            className={`${styles["header__box-right__calendar"]} ${
              !isHiddenCalendar
                ? styles["header__box-right__calendar__isActive"]
                : ""
            }`}
            onClick={handleOpenCalendar}>
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
            onClick={handleOpenAccountMenu}>
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
      <AccountMenu isHidden={isHiddenAccountMenu} />
      <SetCity />
    </>
  );
}

export default Header;
