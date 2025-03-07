import styles from "./styles/geolocation.module.scss";
import { getAddress } from "../../services/apiGeocoding";
import { useEffect, useState } from "react";

function Geolocation({ isHidden, city, onSetCity }) {
  useEffect(() => {
    async function fetchCity() {
      try {
        const data = await getAddress();
        onSetCity(data.city);
      } catch (err) {
        onSetCity("Оберіть місто");
      }
    }

    fetchCity();
  }, [onSetCity]);

  return (
    <div
      className={`${styles.box} ${isHidden ? styles.hidden : styles.visible}`}>
      <p className={styles.box__text}>Ми визначили твоє місто</p>
      <p className={styles.box__city}>{city}</p>
      <button
        type="button"
        className={styles.box__change}>
        Обрати інше місто
      </button>
    </div>
  );
}

export default Geolocation;
