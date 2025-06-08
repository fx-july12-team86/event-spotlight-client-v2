import { useState } from "react";

import styles from "./styles/step3.module.scss";

import Button from "../../../../components/Buttons/Button";
import Header from "../Header/Header";

function Step3({ onSetCurrentStep, description, onSetDescription }) {
  const [errorMessage, setErrorMessage] = useState("");

  function handleNextStep() {
    if (!description) {
      setErrorMessage("Створіть опис до івента");
      return;
    }
    onSetCurrentStep((step) => step + 1);
  }

  return (
    <div className={styles["container"]}>
      <Header
        step={3}
        title={"Опис події"}
        description={
          "Опис повинен мати усі ключові деталі події, окрім тих, що були заповнені на кроці 2"
        }
        errorMessage={errorMessage}
      />
      <div className={styles["container__content"]}>
        <textarea
          placeholder="Майстер-клас з миловаріння для дорослих та дітей"
          maxLength={1000}
          value={description}
          onChange={(event) => {
            onSetDescription(event.target.value);
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
          onClick={handleNextStep}>
          Наступний крок
        </Button>
      </div>
    </div>
  );
}

export default Step3;
