import styles from "./styles/eventItem.module.scss";
import eventPhoto from "./TestPhoto/EventPhotoTest.webp";

function EventItem({ data }) {
  const { category, title, date, time, location, price } = data;
  return (
    <div className={styles["event-item"]}>
      <img
        className={styles["event-item__image"]}
        src={eventPhoto}
        alt="Photo of event"
      />
      <div className={styles["event-item__description"]}>
        <div className={styles["event-item__header"]}>
          <p className={styles["event-item__category"]}>{category}</p>
          <div className={styles["event-item__icon"]}>
            <svg className={styles["event-item__svgSizeNormalize"]}>
              <use href="/icons/Home/eventList/favorites.svg#favorites"></use>
            </svg>
          </div>
        </div>
        <div className={styles["event-item__content"]}>
          <h3 className={styles["event-item__title"]}>{title}</h3>
          <article className={styles["event-item__details"]}>
            <ul className={styles["event-item__details-list"]}>
              <li className={styles["event-item__datetime"]}>
                <p className={styles["event-item__date"]}>{date}</p>
                <p className={styles["event-item__time"]}>{time}</p>
              </li>
              <li className={styles["event-item__location"]}>{location}</li>
              <li className={styles["event-item__price"]}>{price} ₴</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
