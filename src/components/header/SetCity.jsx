import { useState } from "react";
import styles from "./styles/setCity.module.scss";
import { useDataContext } from "../../Context/Context";

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
  const { dispatch, selectCity } = useDataContext();

  return (
    <div
      className={`${styles.background} ${!selectCity ? styles.isHidden : ""}`}>
      <div className={styles.background__box}>
        <div className={styles.background__box__header}>
          <h2>Обери місто</h2>
          <button
            className={styles.background__box__closeBtn}
            onClick={() => dispatch({ type: "city/select" })}>
            <svg className={styles.svgSizeNormalize}>
              <use href="/icons/header/navBar/icons.svg#cross"></use>
            </svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="Пошук"
          className={styles.background__box__input}
          value={chosenCity}
          onChange={(event) => {
            setChosenCity(event.target.value);
            dispatch({ type: "city/new", payload: event.target.value });
          }}
        />
        <ul className={styles.background__box__citiesList}>
          {cities.map((city) => (
            <li
              key={city.city}
              onClick={() =>
                dispatch({ type: "city/new", payload: city.city })
              }>
              {city.city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SetCity;
