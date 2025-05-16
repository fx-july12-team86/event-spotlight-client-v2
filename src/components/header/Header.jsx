import { Link, useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/header.module.scss";

import Geolocation from "./components/Geolocation/Geolocation";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import SearchEvent from "./components/SearchEvent/SearchEvent";
import SetCity from "./components/SetCity/SetCity";
import SetDateComp from "./components/SetDateComp/SetDateComp";
import Authentication from "./components/Authentication/Authentication";

import { toggleCurrentCity } from "../../context/citySlice";
import { getAddress } from "../../services/apiGeocoding";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Header({ headerRef }) {
  const [isHiddenGeo, setIsHiddenGeo] = useState(true);
  const [isHiddenCalendar, setIsHiddedCalendar] = useState(true);
  const [isHiddenAccountMenu, setIsHiddenAccountMenu] = useState(true);
  const [isHiddenSearchInput, setIsHiddedSearchInput] = useState(true);
  const [isHiddenLogin, setIsHiddenLogin] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { city } = useSelector((store) => store.city);
  const { isAuthenticated } = useSelector((store) => store.user);

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

  function handleAddEvent() {
    if (!isAuthenticated) {
      setIsHiddenLogin(false);
    } else {
      navigate("/create-event");
    }
  }

  useEffect(() => {
    async function fetchCity() {
      try {
        const data = await getAddress();
        dispatch(toggleCurrentCity(data.city));

        const params = new URLSearchParams(searchParams);
        params.set("city", data.city);
        setSearchParams(params, { replace: true });
      } catch (err) {
        dispatch(toggleCurrentCity("Київ"));
      }
    }

    fetchCity();
  }, []);

  return (
    <>
      <header
        className={styles["header"]}
        ref={headerRef}>
        <div className={styles["header__box-left"]}>
          <p
            onClick={() => {
              navigate("/");
            }}
            className={styles["header__box-left__logo"]}>
            EventSpotlight
          </p>
          <span
            className={`${styles["header__box-left__geolocation"]} ${
              !isHiddenGeo
                ? styles["header__box-left__geolocation__isActive"]
                : ""
            }`}
            onClick={handleToggleChangeGeo}>
            {city.length === 0 ? "Місто" : city}
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
                href={`${BASE_URL}/icons/Header/navBar/icons.svg#calendar`}></use>
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
          <button
            className={styles["header__box-right__addEvent"]}
            onClick={handleAddEvent}>
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
