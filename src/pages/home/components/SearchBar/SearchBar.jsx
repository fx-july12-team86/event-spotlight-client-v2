import styles from "./styles/searchBar.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Select from "../Select/Select";
import CalendarComp from "../../../../components/Calendar/CalendarComp";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters, formatDate } from "../../../../Context/filtersSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const events = [
  "Всі події",
  "Концерти",
  "Майстер-класи",
  "Фестивалі",
  "Онлайн події",
  "Для дітей",
  "Вечірки",
  "Виставки",
  "Театр",
  "Кіно",
  "Спорт",
  "Семінари",
  "Екскурсії",
  "Конференції",
  "Тренінги",
  "Стендапи",
  "Музеї",
  "Шоу",
  "Безкоштовні події",
  "Інше",
];

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.city);
  const { filters, datesRange } = useSelector((store) => store.filters);

  const amountOfFilters = filters.length;

  useEffect(() => {
    if (datesRange === null) return;
    dispatch(
      updateFilters(datesRange.map((date) => formatDate(date)).join(" - "))
    );
  }, [dispatch, datesRange]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!query) return;
    navigate(`/catalog?search=${query}`);
    setQuery("");
  }

  function handleUpdateFilters(filter) {
    dispatch(updateFilters(filter));
  }

  return (
    <nav className={styles["container"]}>
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
          id="search"
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
          className={styles["container__form__btnLocation"]}>
          <svg className={styles["container__form__btnLocation__icon"]}>
            <use
              href={`${BASE_URL}/icons/Home/search/icons.svg#geolocation`}></use>
          </svg>
          {city}
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
        {filters.length > 0 ? (
          <div>
            <h3 className={styles["container__containerFilters__count"]}>
              Фільтри <span>({amountOfFilters})</span>
            </h3>
            <ul className={styles["container__containerFilters__filtersList"]}>
              {filters.map((filter) => (
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
              {events.map((event) => (
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
