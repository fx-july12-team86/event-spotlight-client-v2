import { useState } from "react";

import styles from "./styles/step3.module.scss";

import Button from "../../../../components/Buttons/Button";

function Step3({ currentStep, onSetCurrentStep }) {
  const [description, setDescription] = useState("");

  return (
    <div className={styles["container"]}>
      <header className={styles["container__header"]}>
        <span className={styles["container__step-number"]}>3</span>
        <div className={styles["container__step-info"]}>
          <h3 className={styles["container__step-title"]}>Опис події</h3>
          <p className={styles["container__step-description"]}>
            Опис повинен мати усі ключові деталі події, окрім тих, що були
            заповнені на кроці 2
          </p>
        </div>
      </header>
      <div className={styles["container__content"]}>
        <textarea
          placeholder="Майстер-клас з миловаріння для дорослих та дітей"
          maxLength={1000}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <p className={styles["container__count"]}>{description.length}/1000</p>
      </div>
      <div className={styles["container__btns"]}>
        <button
          className={styles["container__beforeBtn"]}
          onClick={() => onSetCurrentStep((step) => step - 1)}>
          Попередній крок
        </button>
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

export default Step3;
