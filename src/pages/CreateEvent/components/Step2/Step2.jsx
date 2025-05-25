import { useState } from "react";

import styles from "./styles/step2.module.scss";

import SelectCategory from "./components/SelectCategory/SelectCategory";
import Button from "../../../../components/Buttons/Button";

function Step2({ currentStep, onSetCurrentStep }) {
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("Оберіть категорію");

  const [adress, setAdress] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className={styles["container"]}>
      <header className={styles["container__header"]}>
        <span className={styles["container__step-number"]}>2</span>
        <div className={styles["container__step-info"]}>
          <h3 className={styles["container__step-title"]}>
            інформація про подію
          </h3>
          <p className={styles["container__step-description"]}>
            Усі поля обов’язкові до заповнення!
          </p>
        </div>
      </header>
      <div className={styles["container__content"]}>
        <div className={styles["container__event-name"]}>
          <label htmlFor="title">Назва події</label>
          <input
            type="text"
            id="title"
            placeholder="Майстер-клас з миловаріння"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            required
          />
        </div>
        <SelectCategory
          category={category}
          onSetCategory={setCategory}
        />
        <div className={styles["container__container-adress"]}>
          <div className={styles["container__adress"]}>
            <label htmlFor="adress">Адреса проведення</label>
            <div className={styles["container__adress-wrapper"]}>
              <input
                type="text"
                id="adress"
                placeholder="вул. Добровольска 34а, Київ"
                disabled={isOnline}
                value={adress}
                onChange={(event) => setAdress(event.target.value)}
              />
            </div>
          </div>
          <div className={styles["container__adress--online"]}>
            <input
              id="isOnline"
              type="checkbox"
              checked={isOnline}
              onChange={(event) => setIsOnline(event.target.checked)}
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
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
          <div className={styles["container__price--online"]}>
            <input
              id="isFree"
              type="checkbox"
              checked={isFree}
              onChange={(event) => setIsFree(event.target.checked)}
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
                onChange={(event) => setDate(event.target.value)}
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
                onChange={(event) => setTime(event.target.value)}
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
          onClick={() => onSetCurrentStep((step) => step + 1)}>
          Наступний крок
        </Button>
      </div>
    </div>
  );
}

export default Step2;
