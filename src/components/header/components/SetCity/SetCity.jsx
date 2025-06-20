import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/setCity.module.scss";
import {
  updateSelectCity,
  updateCurrentCity,
} from "../../../../context/citySlice";

import { useSearchParams } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const cities = [
  { city: "Усі міста" },
  { city: "Одеса" },
  { city: "Дніпро" },
  { city: "Онлайн" },
  { city: "Київ" },
  { city: "Львів" },
  { city: "Харків" },
  { city: "Запоріжжя" },
  { city: "Кам'янське" },
  { city: "Кропивницький" },
  { city: "Біла Церква" },
  { city: "Суми" },
  { city: "Ужгород" },
  { city: "Черкаси" },
  { city: "Вінниця" },
  { city: "Жовті Води" },
  { city: "Кам'янець-Подільський" },
  { city: "Хмельницький" },
  { city: "Луцьк" },
  { city: "Чернігів" },
  { city: "Тернопіль" },
  { city: "Кривий Ріг" },
  { city: "Чернівці" },
  { city: "Олександрія" },
  { city: "Рівне" },
  { city: "Івано-Франківськ" },
  { city: "Кременчук" },
  { city: "Буковель" },
  { city: "Мукачево" },
  { city: "Трускавець" },
  { city: "Бровари" },
  { city: "Миколаїв" },
];

function SetCity() {
  const [chosenCity, setChosenCity] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const selectCity = useSelector((store) => store.city.selectCity);

  function handleUpdateCity(city) {
    dispatch(updateCurrentCity(city));
    const params = new URLSearchParams(searchParams);
    params.set("city", city);
    setSearchParams(params, { replace: true });
  }

  return (
    <div
      className={`${styles["background"]} ${
        !selectCity ? styles["isHidden"] : ""
      }`}>
      <div className={styles["background__box"]}>
        <div className={styles["background__box__header"]}>
          <h2>Обери місто</h2>
          <button
            className={styles["background__box__closeBtn"]}
            onClick={() => dispatch(updateSelectCity(false))}>
            <svg className={styles.svgSizeNormalize}>
              <use
                href={`${BASE_URL}/icons/Header/navBar/icons.svg#cross`}></use>
            </svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="Пошук"
          className={styles["background__box__input"]}
          value={chosenCity}
          onChange={(event) => {
            setChosenCity(event.target.value);
            dispatch(updateSelectCity(event.target.value));
          }}
        />
        <ul className={styles["background__box__cities-list"]}>
          {cities.map((city) => (
            <li
              key={city.city}
              onClick={() => handleUpdateCity(city.city)}>
              {city.city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SetCity;
