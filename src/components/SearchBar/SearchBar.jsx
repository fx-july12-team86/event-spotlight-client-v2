import { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/searchBar.module.scss";

import Select from "../../pages/Home/components/Select/Select";
import CalendarComp from "../Calendar/CalendarComp";

import {
  updateFilters,
  updateRangeDate,
  toggleFilters,
} from "../../context/filtersSlice";

import { getEventsCatalog } from "../../services/apiEvents";

import { isValidDateRange } from "../../helpers/date";

import { updateCatalogEvents } from "../../Context/dataEventsSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const categories = [
  "Концерти",
  "Театр",
  "Стендап",
  "Діти",
  "Фестивалі",
  "Танці",
  "Вечірки",
  "Семінари і тренінги",
  "Спорт",
  "Екскурсії",
  "Творчій вечір",
  "Інше",
];

function SearchBar({ isError = false }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const city = useSelector((state) => state.city.city);
  const { filters, datesRangeFormatted, datesRange } = useSelector(
    (store) => store.filters
  );
  let tottalFilters;

  if (datesRangeFormatted) {
    tottalFilters = [...filters, datesRangeFormatted];
  } else {
    tottalFilters = [...filters];
  }

  const amountOfFilters = tottalFilters.length;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (query) params.set("search", query);
    if (filters.length) filters.forEach((f) => params.append("filter", f));
    if (datesRange.length === 2) {
      const [from, to] = datesRange;
      params.set("dateFrom", from);
      params.set("dateTo", to);
    }

    params.set("page", "1");
    params.set("trigger", "1");

    if (location.pathname !== "/catalog") {
      navigate(`/catalog?${params.toString()}`, { replace: true });
    } else {
      setSearchParams(params, { replace: true });
    }

    setQuery("");
  };

  function resetToCatalogStart() {
    const newParams = new URLSearchParams();

    newParams.set("page", "1");
    newParams.set("trigger", "1");
    const city = searchParams.get("city");
    if (city) newParams.set("city", city);

    setSearchParams(newParams, { replace: true });
  }

  function handleUpdateFilters(filter) {
    if (isValidDateRange(filter)) {
      dispatch(updateRangeDate([]));
    } else {
      dispatch(toggleFilters(filter));
    }
  }

  function handleAddAllFilters() {
    categories.forEach((category) => {
      dispatch(updateFilters(category));
    });
  }

  useEffect(() => {
    const params = new URLSearchParams();

    filters.forEach((filter) => {
      params.append("filter", filter);
    });

    if (datesRange.length === 2) {
      const [from, to] = datesRange;
      params.set("dateFrom", from);
      params.set("dateTo", to);
    }

    setSearchParams(params, { replace: true });
  }, [filters, datesRange]);

  useEffect(() => {
    const filtersFromUrl = searchParams.getAll("filter");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    if (JSON.stringify(filtersFromUrl) !== JSON.stringify(filters)) {
      filtersFromUrl.forEach((filter) => dispatch(updateFilters(filter)));
    }

    if (dateFrom && dateTo) {
      dispatch(updateRangeDate([dateFrom, dateTo]));
    }
  }, []);

  return (
    <nav
      className={styles["container"]}
      style={{ width: isError ? "98rem" : "" }}>
      <form
        onSubmit={handleSubmit}
        className={styles["container__form"]}>
        <label
          htmlFor="search"
          className={styles["container__form__searchIcon"]}>
          <svg
            className={styles["container__form__searchIcon__svgSizeNormalise"]}>
            <use href={`${BASE_URL}/icons/Home/search/icons.svg#search`}></use>
          </svg>
        </label>
        <input
          type="text"
          placeholder="Пошук"
          className={styles["container__form__input"]}
          style={{ width: isError ? "48.6rem" : "" }}
          id="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type="button"
          className={styles["container__form__btnFilters"]}
          onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <svg className={styles["container__form__btnFilters__icon"]}>
            <use href={`${BASE_URL}/icons/Home/search/icons.svg#filters`}></use>
          </svg>
          Фільтри
        </button>
        <button
          type="button"
          className={styles["container__form__btnLocation"]}
          onClick={resetToCatalogStart}>
          {/* <svg className={styles["container__form__btnLocation__icon"]}>
            <use
              href={`${BASE_URL}/icons/Home/search/icons.svg#geolocation`}></use>
          </svg> */}
          {/* {city} */}
          На початок
        </button>

        <button
          type="submit"
          className={styles["container__form__btnSbmt"]}>
          Пошук
        </button>
      </form>
      <div
        className={styles["container__containerFilters"]}
        style={{ paddingBottom: isOpen ? `${2.4}rem` : "0" }}>
        {tottalFilters.length > 0 ? (
          <div>
            <h3 className={styles["container__containerFilters__count"]}>
              Фільтри <span>({amountOfFilters})</span>
            </h3>
            <ul className={styles["container__containerFilters__filtersList"]}>
              {tottalFilters.map((filter) => (
                <li
                  onClick={() => handleUpdateFilters(filter)}
                  key={filter}
                  className={
                    styles["container__containerFilters__filtersList__item"]
                  }>
                  {filter}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div
          className={styles["container__containerFilters__drop"]}
          style={{
            maxHeight: isOpen ? `${137.5}rem` : "0",
          }}>
          <div
            className={styles["container__containerFilters__filters"]}
            style={{
              transform: isOpen ? `translateY(${0})` : `translateY(${-110}%)`,
            }}>
            <h4>Тип події</h4>
            <ul>
              <li
                onClick={handleAddAllFilters}
                key="Всі події"
                className={`${styles["container__containerFilters__event"]} ${
                  categories.length === filters.length
                    ? styles["container__containerFilters__event__selected"]
                    : ""
                }`}>
                Всі події
              </li>
              {categories.map((event) => (
                <li
                  onClick={() => handleUpdateFilters(event)}
                  key={event}
                  className={`${styles["container__containerFilters__event"]} ${
                    filters.includes(event)
                      ? styles["container__containerFilters__event__selected"]
                      : ""
                  }`}>
                  {event}
                </li>
              ))}
            </ul>
            <h4>Сортування</h4>
            <Select />
            <h4>Дата</h4>
            <div className={styles["container__calendar"]}>
              <CalendarComp selectRange={true} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SearchBar;
