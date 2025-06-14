import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/eventItem.module.scss";

import { formatUkrainianDate } from "../../helpers/date";

import Spinner from "../Spinner/Spinner";

import FavoriteIcon from "../../assets/favorite/favorite.svg?react";

import { addFavorite, removeFavorite } from "../../services/apiEvents";
import { truncateByWords } from "../../helpers/workWithStrings";

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

  const titleCheckedLength = truncateByWords(title, 40);

  const coverImgURL = photo.sharedUrl.replace("dl=0", "raw=1");

  const [date, time] = startTime.split("T");

  const formatedDate = formatUkrainianDate(date);

  const formatedTime = time.slice(0, -3);

  const location = address?.cityName;

  async function handleUpdateFavorite(event) {
    event.stopPropagation();

    if (!isAuthenticated) return;

    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
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
      <div className={styles["event-item__image--container"]}>
        <img
          className={styles["event-item__image"]}
          src={coverImgURL}
          alt="Photo of event"
          onLoad={() => setIsLoading(false)}
          onError={(e) => {
            e.currentTarget.src =
              "https://www.dropbox.com/scl/fi/lnbtdy7h2mz8osirh6qbw/template.jpg?rlkey=3l439e4cauh42lg0ie5b4aqcq&raw=1";
            setIsLoading(false);
          }}
        />
      </div>
      <div className={styles["event-item__description"]}>
        <div className={styles["event-item__header"]}>
          <p className={styles["event-item__category"]}>{categoryName}</p>

          <div className={styles["event-item__icon"]}>
            <FavoriteIcon
              onClick={handleUpdateFavorite}
              className={isFavorite ? styles["event-item__icon-fill"] : ""}
            />
          </div>
        </div>
        <div className={styles["event-item__content"]}>
          <h3 className={styles["event-item__title"]}>{titleCheckedLength}</h3>
          <article className={styles["event-item__details"]}>
            <ul className={styles["event-item__details-list"]}>
              {!formatedDate.includes("1970") && (
                <li className={styles["event-item__datetime"]}>
                  <p className={styles["event-item__date"]}>{formatedDate}</p>
                  <p className={styles["event-item__time"]}>{formatedTime}</p>
                </li>
              )}
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
