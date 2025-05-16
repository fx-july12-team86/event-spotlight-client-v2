import styles from "./styles/organizer.module.scss";

import Button from "../../../../components/Buttons/Button";
import { useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Organizer() {
  const navigate = useNavigate();

  return (
    <div className={styles["organizer-container"]}>
      <div className={styles["organizer-container__left"]}>
        <h2 className={styles["organizer-container__title"]}>
          Ти організатор?
        </h2>
        <p className={styles["organizer-container__text"]}>
          Додай свою подію на наш сайт та залучи більше клієнтів на свою подію
        </p>
        <Button
          width={31.3}
          height={6.4}
          onClick={() => {
            navigate("/create-event");
          }}>
          Додати подію
        </Button>
      </div>
      <div className={styles["organizer-container__right"]}>
        <img
          src={`${BASE_URL}/icons/Home/organizer/photo1.webp`}
          alt="image"
          className={`
            ${styles["organizer-container__image"]}   ${styles["organizer-container__image--1"]}`}
        />
        <img
          src={`${BASE_URL}/icons/Home/organizer/photo2.webp`}
          alt="image"
          className={`
            ${styles["organizer-container__image"]}   ${styles["organizer-container__image--2"]}`}
        />
        <img
          src={`${BASE_URL}/icons/Home/organizer/photo3.webp`}
          alt="image"
          className={`
            ${styles["organizer-container__image"]}   ${styles["organizer-container__image--3"]}`}
        />
        <img
          src={`${BASE_URL}/icons/Home/organizer/photo4.webp`}
          alt="image"
          className={`
            ${styles["organizer-container__image"]}   ${styles["organizer-container__image--4"]}`}
        />
      </div>
    </div>
  );
}

export default Organizer;
