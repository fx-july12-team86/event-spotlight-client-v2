import { useState } from "react";

import styles from "./styles/step1.module.scss";

import Button from "../../../../components/Buttons/Button";
import Header from "../Header/Header";

function Step1({
  onSetCurrentStep,
  titlePhoto,
  onSetTitlePhoto,
  photo1,
  onSetPhoto1,
  photo2,
  onSetPhoto2,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  function handleToNextPage() {
    if (!titlePhoto) {
      setErrorMessage(
        "Для переходу на наступний крок повинно бути фото на обкладинку"
      );
      return;
    }

    onSetCurrentStep((step) => step + 1);
  }
  function handleAddPhoto(event, setPhoto) {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  }

  return (
    <div className={styles["container"]}>
      <Header
        step={1}
        title={"зображення події"}
        description={"Перше зображення буде обкладинкою"}
        errorMessage={errorMessage}
      />
      <div className={styles["container__content"]}>
        <label
          className={styles["container__input-title"]}
          style={
            titlePhoto
              ? {
                  backgroundImage: `url(${URL.createObjectURL(titlePhoto)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }>
          <input
            type="file"
            onChange={(event) => handleAddPhoto(event, onSetTitlePhoto)}
          />
          <button
            type="button"
            className={`${
              titlePhoto ? styles["container__input-btn-hidden"] : ""
            }`}>
            +
          </button>
        </label>
        <label
          className={styles["container__input-imgs"]}
          style={
            photo1
              ? {
                  backgroundImage: `url(${URL.createObjectURL(photo1)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }>
          <input
            type="file"
            onChange={(event) => handleAddPhoto(event, onSetPhoto1)}
          />
          <button
            type="button"
            className={`${
              photo1 ? styles["container__input-btn-hidden"] : ""
            }`}>
            +
          </button>
        </label>
        <label
          className={styles["container__input-imgs"]}
          style={
            photo2
              ? {
                  backgroundImage: `url(${URL.createObjectURL(photo2)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }>
          <input
            type="file"
            onChange={(event) => handleAddPhoto(event, onSetPhoto2)}
          />
          <button
            type="button"
            className={`${
              photo2 ? styles["container__input-btn-hidden"] : ""
            }`}>
            +
          </button>
        </label>
      </div>
      <div className={styles["container__btn"]}>
        <Button
          width={36}
          height={6.4}
          onClick={handleToNextPage}>
          Наступний крок
        </Button>
      </div>
    </div>
  );
}

export default Step1;
