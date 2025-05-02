import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/eventItem.module.scss";

import { formatUkrainianDate } from "../../helpers/date";

import Spinner from "../Spinner/Spinner";

import FavoriteIcon from "../../assets/favorite/favorite.svg?react";

import { addFavorite, removeFavorite } from "../../services/apiEvents";
import { set } from "lodash";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function EventItem({ data }) {
  const {
    id,
    photo,
    title,
    categoryName,
    startTime,
    address,
    price,
    isFavorite: isFavoriteBack,
  } = data;

  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(isFavoriteBack);

  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  const coverImgURL = photo.sharedUrl.replace("dl=0", "raw=1");

  const [date, time] = startTime.split("T");

  const formatedDate = formatUkrainianDate(date);
  const formatedTime = time.slice(0, -3);

  const location = address.cityName;

  async function handleUpdateFavorite(event) {
    event.stopPropagation();

    let response;

    if (!isAuthenticated) return;

    if (isFavorite) {
      response = await removeFavorite(id);
    } else {
      response = await addFavorite(id);
    }

    setIsFavorite((prev) => !prev);
    console.log("favorite changed");
  }

  return (
    <div
      onClick={() => navigate(`/event/${id}`)}
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
          <p className={styles["event-item__category"]}>{categoryName}</p>

          <div className={styles["event-item__icon"]}>
            {/* <svg className={`${styles["event-item__svgSizeNormalize"]}`}>
              <use
                href={`${BASE_URL}/icons/Home/event/favorite.svg#filled`}></use>
            </svg> */}
            <FavoriteIcon
              onClick={handleUpdateFavorite}
              className={isFavorite ? styles["event-item__icon-fill"] : ""}
            />
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
    </div>
  );
}

export default EventItem;
