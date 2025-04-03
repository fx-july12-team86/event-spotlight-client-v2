import SearchBar from "../SearchBar/SearchBar";
import styles from "./styles/error.module.scss";

function Error() {
  return (
    <div className={styles["container"]}>
      <div className={styles["container__message-container"]}>
        <h1 className={styles["container__title"]}>Ой, щось пішло не так!</h1>
        <p className={styles["container__text"]}>
          Схоже, що ця сторінка зникла на одному з івентів. Але не хвилюйся, ми
          допоможемо знайти щось круте у твоєму місті!
        </p>
      </div>
      <SearchBar isError={true} />
    </div>
  );
}

export default Error;
