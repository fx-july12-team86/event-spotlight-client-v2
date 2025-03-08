import styles from "./styles/geolocation.module.scss";
import { getAddress } from "../../services/apiGeocoding";
import { useEffect, useState } from "react";
import { useDataContext } from "../../Context/Context";

function Geolocation({ isHidden, onSetIsHiddenGeo }) {
  const { dispatch, city } = useDataContext();

  useEffect(() => {
    async function fetchCity() {
      try {
        const data = await getAddress();
        dispatch({ type: "city/new", payload: data.city });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "city/new", payload: "Оберіть місто" });
      }
    }

    fetchCity();
  }, [dispatch]);

  return (
    <div
      className={`${styles.box} ${isHidden ? styles.hidden : styles.visible}`}>
      <p className={styles.box__text}>Ми визначили твоє місто</p>
      <p className={styles.box__city}>{city}</p>
      <button
        type="button"
        className={styles.box__change}
        onClick={() => {
          dispatch({ type: "city/select" });
          onSetIsHiddenGeo(true);
        }}>
        Обрати інше місто
      </button>
    </div>
  );
}

export default Geolocation;
