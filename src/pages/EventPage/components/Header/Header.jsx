import { useSelector } from "react-redux";
import { useState } from "react";

import styles from "./styles/header.module.scss";

import { formatUkrainianDate } from "../../../../helpers/date";

import Spinner from "../../../../components/Spinner/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Header() {
  const [isLoading, setIsLoading] = useState(true);

  const eventData = useSelector((store) => store.currentEvent.data);

  if (!eventData) {
    return;
  }

  const { title, photos, startTime, categories, address, price } = eventData;

  const photoURL = photos?.at(0)?.sharedUrl?.replace("dl=0", "raw=1");

  const category = categories.at(0).name;

  const date = startTime.split("T").at(0);
  const time = startTime.split("T").at(1);

  const formatedtime = time.slice(0, -3);
  const formatedDate = formatUkrainianDate(date);

  const location = `${address.street} ${address.number}, м. ${address.cityName}`;

  return (
    <div className={styles["container"]}>
      {!eventData ? (
        <Spinner />
      ) : (
        <>
          {isLoading && (
            <div
              style={{
                width: "100%",
                height: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Spinner />
            </div>
          )}
          <img
            src={photoURL}
            alt="Event photo"
            onLoad={() => setIsLoading(false)}
          />
          <div className={styles["container__description"]}>
            <article className={styles["container__article"]}>
              <div className={styles["container__wrapper"]}>
                <p className={styles["container__category"]}>{category}</p>
                <svg
                  className={`${styles["container__svgSizeNormalize"]} ${styles["container__icon"]}`}>
                  <use
                    href={`${BASE_URL}/icons/Home/event/favorites.svg#favorites`}></use>
                </svg>
              </div>
              <p className={styles["container__title"]}>{title}</p>
              <div className={styles["container__datetime"]}>
                <p className={styles["container__date"]}>{formatedDate}</p>
                <p>{formatedtime}</p>
              </div>
              <p className={styles["container__location"]}>{location}</p>
              <p className={styles["container__price"]}>{price} ₴</p>
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
        </>
      )}
    </div>
  );
}

export default Header;
