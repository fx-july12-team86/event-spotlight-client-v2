import styles from "./modalWindow.module.scss";

function WelcomeModalAfterSubmit({ onSetIsActiveModal }) {
  return (
    <div className={styles["container"]}>
      <div className={styles["container__modal"]}>
        <header className={styles["container__modal--header"]}>
          <h2>Вітаємо!</h2>
          <button onClick={() => onSetIsActiveModal(false)}></button>
        </header>
        <p>
          Твоя подія збережена та буде опублікована на сайті після перевірки
          адміністрацією.
        </p>
      </div>
    </div>
  );
}

export default WelcomeModalAfterSubmit;
