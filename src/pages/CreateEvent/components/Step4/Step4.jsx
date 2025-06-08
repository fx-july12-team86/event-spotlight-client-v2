import { useEffect, useState } from "react";

import styles from "./styles/step4.module.scss";

import Button from "../../../../components/Buttons/Button";
import Header from "../Header/Header";

function Step4({
  onSetCurrentStep,
  phone,
  onSetPhone,
  email,
  onSetEmail,
  instagram,
  onSetInstagram,
  telegram,
  onSetTelegram,
  facebook,
  onSetFacebook,
  webSite,
  onSetWebsite,
  isValidStep4,
  onSetIsValidStep4,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isValidStep4 === "start") {
      if (
        !phone &&
        !email &&
        !instagram &&
        !telegram &&
        !facebook &&
        !webSite
      ) {
        setErrorMessage("Заповніть хоча б одне поле");
        onSetIsValidStep4("invalid");
      } else {
        onSetIsValidStep4("valid");
      }
    }
  }, [isValidStep4]);

  function handleAcceptSumbit() {
    onSetIsValidStep4("start");
  }

  return (
    <div className={styles["container"]}>
      <Header
        step={4}
        title={"контактна інформація організатора"}
        description={"Потрібно заповнити хоча б одне поле"}
        errorMessage={errorMessage}
      />
      <div className={styles["container__content"]}>
        <div className={styles["container__phone"]}>
          <label htmlFor="phone">Номер телефону</label>
          <div className={styles["container__phone-wrapper"]}>
            <input
              type="tel"
              id="phone"
              placeholder="+380990000000"
              value={phone}
              onChange={(e) => onSetPhone(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["container__email"]}>
          <label htmlFor="email-step4">E-mail</label>
          <div className={styles["container__email-wrapper"]}>
            <input
              type="email"
              id="email-step4"
              placeholder="myemail@gmail.com"
              value={email}
              onChange={(e) => onSetEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["container__instagram"]}>
          <label htmlFor="instagram">Instagram</label>
          <div className={styles["container__instagram-wrapper"]}>
            <input
              type="text"
              id="instagram"
              placeholder="@instagram"
              value={instagram}
              onChange={(e) => onSetInstagram(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["container__telegram"]}>
          <label htmlFor="telegram">Telegran</label>
          <div className={styles["container__telegram-wrapper"]}>
            <input
              type="text"
              id="telegram"
              placeholder="@telegram"
              value={telegram}
              onChange={(e) => onSetTelegram(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["container__facebook"]}>
          <label htmlFor="facebook">Facebook</label>
          <div className={styles["container__facebook-wrapper"]}>
            <input
              type="text"
              id="facebook"
              placeholder="@facebook"
              value={facebook}
              onChange={(e) => onSetFacebook(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["container__website"]}>
          <label htmlFor="website">Офіційний ресурс</label>
          <div className={styles["container__website-wrapper"]}>
            <input
              type="text"
              id="website"
              placeholder="www.website.com"
              value={webSite}
              onChange={(e) => onSetWebsite(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles["container__btns"]}>
        <button
          className={styles["container__beforeBtn"]}
          onClick={() => onSetCurrentStep((step) => step - 1)}>
          Попередній крок
        </button>
        <Button
          type="button"
          width={36}
          height={6.4}
          onClick={handleAcceptSumbit}>
          Зберегти та опублікувати
        </Button>
      </div>
    </div>
  );
}

export default Step4;
