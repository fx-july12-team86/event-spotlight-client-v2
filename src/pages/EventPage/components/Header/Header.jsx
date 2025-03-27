import styles from "./styles/header.module.scss";
import eventPhoto from "../../TestPhoto/EventPagePhoto.webp";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Header() {
  return (
    <div className={styles["container"]}>
      <img
        src={eventPhoto}
        alt="Event photo"
      />
      <div className={styles["container__description"]}>
        <article className={styles["container__article"]}>
          <div className={styles["container__wrapper"]}>
            <p className={styles["container__category"]}>Майстер-класи</p>
            <svg
              className={`${styles["container__svgSizeNormalize"]} ${styles["container__icon"]}`}>
              <use
                href={`${BASE_URL}/icons/Home/event/favorites.svg#favorites`}></use>
            </svg>
          </div>
          <p className={styles["container__title"]}>
            Майстер-класс з миловаріння
          </p>
          <div className={styles["container__datetime"]}>
            <p className={styles["container__date"]}>24 липня 2025</p>
            <p>18:00</p>
          </div>
          <p className={styles["container__location"]}>
            Art studio “Lila”, Київ
          </p>
          <p className={styles["container__price"]}>350 ₴</p>
        </article>
        <div className={styles["container__buttons"]}>
          <button className={styles["container__contact-button"]}>
            Зв’язатись з орагнізатором
          </button>
          <button className={styles["container__share-button"]}>
            Поділитись з друзями
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
