import styles from "./styles/geolocation.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateSelectCity } from "../../../../context/citySlice";

function Geolocation({ isHidden, onSetIsHiddenGeo }) {
  const dispatch = useDispatch();

  const { city } = useSelector((state) => state.city);

  return (
    <div
      className={`${styles["box"]} ${
        isHidden ? styles["hidden"] : styles["visible"]
      }`}>
      <p className={styles["box__text"]}>Ми визначили твоє місто</p>
      <p className={styles["box__city"]}>{city}</p>
      <button
        type="button"
        className={styles["box__change"]}
        onClick={() => {
          dispatch(updateSelectCity(true));
          onSetIsHiddenGeo(true);
        }}>
        Обрати інше місто
      </button>
    </div>
  );
}

export default Geolocation;
