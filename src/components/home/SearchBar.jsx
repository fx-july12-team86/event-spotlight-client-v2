import styles from "./styles/searchBar.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router";
import Select from "./Select";
import SetDateComp from "../header/SetDateComp";
import CalendarComp from "../header/CalendarComp";
import { useSelector } from "react-redux";

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
  const navigate = useNavigate();

  const { city } = useSelector((state) => state.city.city);

  function handleSubmit(event) {
    event.preventDefault();

    if (!query) return;
    navigate(`/events/${query}`);
    setQuery("");
  }

  return (
    <>
      <nav className={styles.container}>
        <form className={styles.container__form}>
          <label
            htmlFor="search"
            className={styles.container__form__searchIcon}>
            <svg
              className={styles.container__form__searchIcon__svgSizeNormalise}>
              <use href="/icons/main/search/icons.svg#search"></use>
            </svg>
          </label>
          <input
            type="text"
            placeholder="Пошук"
            className={styles.container__form__input}
            id="search"
          />
          <button
            type="button"
            className={styles.container__form__btnFilters}>
            <svg className={styles.container__form__btnFilters__icon}>
              <use href="/icons/main/search/icons.svg#filters"></use>
            </svg>
            Фільтри
          </button>
          <button
            type="button"
            className={styles.container__form__btnLocation}>
            <svg className={styles.container__form__btnLocation__icon}>
              <use href="/icons/main/search/icons.svg#geolocation"></use>
            </svg>
            {city}
          </button>

          <button
            type="submit"
            className={styles.container__form__btnSbmt}>
            Пошук
          </button>
        </form>
        <div className={styles.container__containerFilters}>
          <h3 className={styles.container__containerFilters__count}>
            Фільтри <span>(Х)</span>
          </h3>
          <div className={styles.container__containerFilters__filters}>
            <h4>Тип події</h4>
            <ul>
              {events.map((event) => (
                <li
                  key={event}
                  className={styles.container__containerFilters__event}>
                  {event}
                </li>
              ))}
            </ul>
            <h4>Сортування</h4>
            <Select />
            <h4>Дата</h4>
            <CalendarComp />
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default SearchBar;
