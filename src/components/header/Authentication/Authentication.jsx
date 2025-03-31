import { useState } from "react";

import styles from "./styles/authentication.module.scss";
import Login from "./Login/Login";
import Registretion from "./Registretion/Registretion";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Authentication({ isHidden, onHandleToggleLogin }) {
  const [toRegistrated, setToRegistrated] = useState(false);

  function handleToggleRegistrated() {
    setToRegistrated((toRegistrated) => !toRegistrated);
  }

  return (
    <div
      className={`${styles["background"]} ${
        isHidden ? styles["background__visible"] : ""
      }`}>
      <div className={styles["background__container"]}>
        <header className={styles["background__header"]}>
          <h2>Вхід</h2>
          <button
            type="button"
            onClick={onHandleToggleLogin}>
            <svg>
              <use
                href={`${BASE_URL}/icons/Header/navBar/icons.svg#cross`}></use>
            </svg>
          </button>
        </header>
        {!toRegistrated ? (
          <Login onHandleToggleLogin={onHandleToggleLogin} />
        ) : (
          <Registretion />
        )}

        <button
          type="button"
          className={styles["background__btn"]}
          onClick={handleToggleRegistrated}>
          {!toRegistrated ? "Зареєструватись" : "Увійти"}
        </button>
      </div>
    </div>
  );
}

export default Authentication;
