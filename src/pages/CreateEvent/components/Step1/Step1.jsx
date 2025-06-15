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

  function getBackgroundStyle(photo) {
    if (!photo) return {};
    const url = typeof photo === "string" ? photo : URL.createObjectURL(photo);
    return {
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
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
          style={getBackgroundStyle(titlePhoto)}>
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
          style={getBackgroundStyle(photo1)}>
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
          style={getBackgroundStyle(photo2)}>
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
