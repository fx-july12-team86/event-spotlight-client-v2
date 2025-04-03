import { Link } from "react-router";
import { useState } from "react";

import styles from "./styles/eventItem.module.scss";
import { formatUkrainianDate } from "../../helpers/date";
import Spinner from "../Spinner/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function EventItem({ data }) {
  const [isLoading, setIsLoading] = useState(true);

  const { id, photos, title, categories, startTime, address, price } = data;

  const coverImgURL = photos.at(0).sharedUrl.replace("dl=0", "raw=1");

  const [date, time] = startTime.split("T");

  const formatedDate = formatUkrainianDate(date);
  const formatedTime = time.slice(0, -3);

  const location = `${address.street} ${address.number}, м. ${address.cityName}`;

  return (
    <Link
      to={`/event/${id}`}
      className={styles["event-item"]}>
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
        className={styles["event-item__image"]}
        src={coverImgURL}
        alt="Photo of event"
        onLoad={() => setIsLoading(false)}
      />
      <div className={styles["event-item__description"]}>
        <div className={styles["event-item__header"]}>
          {categories.map((category) => {
            return (
              <p
                key={category.id}
                className={styles["event-item__category"]}>
                {category.name}
              </p>
            );
          })}
          <div className={styles["event-item__icon"]}>
            <svg
              className={`${styles["event-item__svgSizeNormalize"]} ${styles["event-item__icon-fill"]}`}>
              <use
                href={`${BASE_URL}/icons/Home/event/favorites.svg#favorites`}></use>
            </svg>
          </div>
        </div>
        <div className={styles["event-item__content"]}>
          <h3 className={styles["event-item__title"]}>{title}</h3>
          <article className={styles["event-item__details"]}>
            <ul className={styles["event-item__details-list"]}>
              <li className={styles["event-item__datetime"]}>
                <p className={styles["event-item__date"]}>{formatedDate}</p>
                <p className={styles["event-item__time"]}>{formatedTime}</p>
              </li>
              <li className={styles["event-item__location"]}>{location}</li>
              <li className={styles["event-item__price"]}>{price} ₴</li>
            </ul>
          </article>
        </div>
      </div>
    </Link>
  );
}

export default EventItem;
