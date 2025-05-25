import { useState } from "react";

import styles from "./styles/step4.module.scss";

import Button from "../../../../components/Buttons/Button";

function Step4() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");
  const [facebook, setFacebook] = useState("");

  return (
    <div className={styles["container"]}>
      <header className={styles["container__header"]}>
        <span className={styles["container__step-number"]}>4</span>
        <div className={styles["container__step-info"]}>
          <h3 className={styles["container__step-title"]}>
            контактна інформація організатора{" "}
          </h3>
          <p className={styles["container__step-description"]}>
            Потрібно заповнити хоча б одне поле
          </p>
        </div>
      </header>
      <div className={styles["container__content"]}>
        <div className={styles["container__phone"]}>
          <label htmlFor="phone">Номер телефону</label>
          <div className={styles["container__phone-wrapper"]}>
            <input
              type="tel"
              id="phone"
              placeholder="+380990000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setInstagram(e.target.value)}
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
              onChange={(e) => setTelegram(e.target.value)}
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
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4;
