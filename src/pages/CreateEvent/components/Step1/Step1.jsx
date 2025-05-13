import styles from "./styles/step1.module.scss";

function Step1() {
  return (
    <div className={styles["container"]}>
      <header className={styles["container__header"]}>
        <span className={styles["container__step-number"]}>1</span>
        <div className={styles["container__step-info"]}>
          <h3 className={styles["container__step-title"]}>Зображення події</h3>
          <p className={styles["container__step-description"]}>
            Перше зображення буде обкладинкою
          </p>
        </div>
      </header>
      <div className={styles["container__content"]}>
        <input type="file" />
      </div>
    </div>
  );
}

export default Step1;
