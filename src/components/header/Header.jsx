import { Link } from "react-router";
import styles from "./styles/header.module.scss";
import Geolocation from "./Geolocation";
import { useState } from "react";
import Calendar from "./Calendar";
import AccountMenu from "./AccountMenu";
import SearchEvent from "./SearchEvent";
import SetCity from "./SetCity";

function Header({ city, onSetCity }) {
  const [isHiddenGeo, setIsHiddenGeo] = useState(true);
  const [isHiddenCalendar, setIsHiddedCalendar] = useState(true);
  const [isHiddenAccountMenu, setIsHiddenAccountMenu] = useState(true);
  const [isHiddenSearchInput, setIsHiddedSearchInput] = useState(true);

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
      <header className={styles.header}>
        <div className={styles.header__boxLeft}>
          <Link
            to="/"
            className={styles.header__boxLeft__company}>
            EventSpotlight
          </Link>
          <span
            className={`${styles.header__boxLeft__geolocation} ${
              !isHiddenGeo ? styles.header__boxLeft__geolocation__isActive : ""
            }`}
            onMouseEnter={handleOpenChangleGeo}>
            {city}
          </span>
          <Geolocation
            isHidden={isHiddenGeo}
            city={city}
            onSetCity={onSetCity}
          />
        </div>
        <div className={styles.header__boxRight}>
          <button
            className={styles.header__boxRight__search}
            onClick={handleOpenSearchInput}
            disabled={!isHiddenSearchInput}
            style={{ display: `${!isHiddenSearchInput ? "none" : ""}` }}>
            <svg className={`${styles.svgSizeNormalize} ${styles.svgFill}`}>
              <use href="../../../public/icons/header/navBar/icons.svg#search"></use>
            </svg>
          </button>
          {isHiddenSearchInput || (
            <SearchEvent
              width={48}
              heigh={4.4}
              paddingLeft={6.2}
              handleClickCross={handleOpenSearchInput}
            />
          )}
          <button
            className={`${styles.header__boxRight__calendar} ${
              !isHiddenCalendar
                ? styles.header__boxRight__calendar__isActive
                : ""
            }`}
            onMouseEnter={handleOpenCalendar}>
            <svg className={`${styles.svgSizeNormalize} ${styles.svgFill}`}>
              <use href="../../../public/icons/header/navBar/icons.svg#calendar"></use>
            </svg>
          </button>
          <button
            className={`${styles.header__boxRight__account} ${
              !isHiddenAccountMenu
                ? styles.header__boxRight__account__isActive
                : ""
            }`}
            onMouseEnter={handleOpenAccountMenu}>
            <svg className={`${styles.svgSizeNormalize} ${styles.svgFill}`}>
              <use href="../../../public/icons/header/navBar/icons.svg#account"></use>
            </svg>
          </button>
          <button className={styles.header__boxRight__addEvent}>
            Додати подію
          </button>
        </div>
      </header>
      <Calendar isHidden={isHiddenCalendar} />
      <AccountMenu isHidden={isHiddenAccountMenu} />
      <SetCity />
    </>
  );
}

export default Header;
