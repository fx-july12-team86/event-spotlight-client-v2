import { useState } from "react";

import styles from "./styles/step1.module.scss";

import Button from "../../../../components/Buttons/Button";

function Step1({ onSetCurrentStep }) {
  const [titlePhoto, setTitlePhoto] = useState(null);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);

  function handleAddPhoto(event, setPhoto) {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  }

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
        <label className={styles["container__input-title"]}>
          <input
            type="file"
            onChange={(event) => handleAddPhoto(event, setTitlePhoto)}
          />
          <button type="button">+</button>
        </label>
        <label className={styles["container__input-imgs"]}>
          <input
            type="file"
            onChange={(event) => handleAddPhoto(event, setPhoto1)}
          />
          <button type="button">+</button>
        </label>
        <label className={styles["container__input-imgs"]}>
          <input
            type="file"
            onChange={(event) => handleAddPhoto(event, setPhoto2)}
          />
          <button type="button">+</button>
        </label>
      </div>
      <div className={styles["container__btn"]}>
        <Button
          width={36}
          height={6.4}
          onClick={() => onSetCurrentStep((step) => step + 1)}>
          Наступний крок
        </Button>
      </div>
    </div>
  );
}

export default Step1;
