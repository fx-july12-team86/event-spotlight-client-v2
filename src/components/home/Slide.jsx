import { useRef } from "react";
import styles from "./styles/slide.module.scss";

function Slide({ info, translate }) {
  const { category, name, date, time, location, cost, imgURL } = info;
  return (
    <div
      className={styles.container}
      style={{
        transform: `translateX(${translate}%)`,
        transition: "transform 0.6s ease-in-out",
      }}>
      <img
        src={imgURL}
        alt={name}
        className={styles.container__photo}
      />
      <article className={styles.container__description}>
        <span className={styles.container__description__category}>
          {category}
        </span>
        <p className={styles.container__description__name}>{name}</p>
        <div className={styles.container__description__datetime}>
          <p className={styles.container__description__datetime__date}>
            {date}
          </p>
          <p>{time}</p>
        </div>
        <p className={styles.container__description__location}>{location}</p>
        <p className={styles.container__description__currency}>{cost} ₴</p>
      </article>
    </div>
  );
}

export default Slide;
