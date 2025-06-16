import { useState } from "react";

import styles from "./styles/step2.module.scss";

import Select from "./components/Select/Select";

import Button from "../../../../components/Buttons/Button";
import Header from "../Header/Header";

function Step2({
  onSetCurrentStep,
  title,
  allCategories,
  allCities,
  onSetTitle,
  category,
  onSetCategory,
  street,
  onSetStreet,
  city,
  onSetCity,
  isOnline,
  onSetIsOnline,
  price,
  onSetPrice,
  isFree,
  onSetIsFree,
  date,
  onSetDate,
  time,
  onSetTime,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  function hasEmptyRequiredFields() {
    if (!title.trim()) return true;

    if (!category?.id) return true;

    if (!date || !time) return true;

    if (!isFree && !price.trim()) return true;

    if (!isOnline) {
      if (!street.trim() || !city?.id) return true;
    }

    return false;
  }
  function handleNextPage() {
    if (hasEmptyRequiredFields()) {
      setErrorMessage("Заповніть необхідні поля");
      return;
    }

    onSetCurrentStep((step) => step + 1);
  }

  return (
    <div className={styles["container"]}>
      <Header
        step={2}
        title={"інформація про подію"}
        description={"Усі поля обов’язкові до заповнення!"}
        errorMessage={errorMessage}
      />
      <div className={styles["container__content"]}>
        <div className={styles["container__event-name"]}>
          <label htmlFor="title">Назва події</label>
          <input
            type="text"
            id="title"
            placeholder="Майстер-клас з миловаріння"
            onChange={(event) => onSetTitle(event.target.value)}
            value={title}
            maxLength={14}
            required
          />
        </div>
        <Select
          currentOption={category}
          allOptions={allCategories}
          onSetOption={onSetCategory}
        />
        <div className={styles["container__container-address"]}>
          <div className={styles["container__street"]}>
            <label htmlFor="street">Адреса проведення</label>
            <div className={styles["container__street-wrapper"]}>
              <input
                type="text"
                id="street"
                placeholder="вул. Добровольска 34а"
                disabled={isOnline}
                value={street}
                onChange={(event) => onSetStreet(event.target.value)}
              />
            </div>
          </div>
          <div className={styles["container__city"]}>
            <label>Місто проведення</label>
            <Select
              currentOption={city}
              allOptions={allCities}
              onSetOption={onSetCity}
              isBlocked={isOnline}
            />
          </div>
          <div className={styles["container__address--online"]}>
            <input
              id="isOnline"
              type="checkbox"
              checked={isOnline}
              onChange={(event) => onSetIsOnline(event.target.checked)}
            />
            <label htmlFor="isOnline">Онлайн</label>
          </div>
        </div>
        <div className={styles["container__container-price"]}>
          <div className={styles["container__price"]}>
            <label htmlFor="price">Ціна квитка</label>
            <div className={styles["container__price-wrapper"]}>
              <input
                type="text"
                id="price"
                placeholder="350"
                disabled={isFree}
                value={price}
                onChange={(event) => onSetPrice(event.target.value)}
              />
            </div>
          </div>
          <div className={styles["container__price--online"]}>
            <input
              id="isFree"
              type="checkbox"
              checked={isFree}
              onChange={(event) => onSetIsFree(event.target.checked)}
            />
            <label htmlFor="isFree">Безкоштовно</label>
          </div>
        </div>
        <div className={styles["container__container-date-time"]}>
          <div className={styles["container__date"]}>
            <label htmlFor="date">Дата проведення</label>
            <div className={styles["container__date-wrapper"]}>
              <input
                type="text"
                id="date"
                placeholder="21.07.2024"
                value={date}
                onChange={(event) => onSetDate(event.target.value)}
              />
            </div>
          </div>
          <div className={styles["container__time"]}>
            <label htmlFor="time">Час проведення</label>
            <div className={styles["container__time-wrapper"]}>
              <input
                type="text"
                id="time"
                placeholder="18:30"
                value={time}
                onChange={(event) => onSetTime(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["container__btns"]}>
        <button
          className={styles["container__beforeBtn"]}
          onClick={() => onSetCurrentStep((step) => step - 1)}>
          Попередній крок
        </button>
        <Button
          width={36}
          height={6.4}
          onClick={handleNextPage}>
          Наступний крок
        </Button>
      </div>
    </div>
  );
}

export default Step2;
