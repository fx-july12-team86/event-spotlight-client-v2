import styles from "./styles/registretion.module.scss";
import Button from "../../../Buttons/Button";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Registretion() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleTogglePassword() {
    setIsVisiblePassword((prev) => !prev);
  }

  return (
    <form
      className={styles["container"]}
      onSubmit={handleSubmit}>
      <div className={styles["container__email"]}>
        <label htmlFor="email">E-mail</label>
        <input
          placeholder="myemail@gmail.com"
          type="email"
          name=""
          id="email"
        />
      </div>
      <div className={styles["container__nikname"]}>
        <label htmlFor="nikname">Ваше ім'я / нік / псевдонім</label>
        <input
          placeholder="qwerdx12345"
          type="text"
          name=""
          id="nikname"
        />
      </div>
      <div className={styles["container__password"]}>
        <label htmlFor="password">Пароль</label>
        <input
          placeholder="qwerdx12345"
          type={!isVisiblePassword ? "password" : "text"}
          name=""
          id="password"
        />
        <img
          className={styles["container__img"]}
          src={
            !isVisiblePassword
              ? `${BASE_URL}/icons/Header/Authentication/eyeClose.svg`
              : `${BASE_URL}/icons/Header/Authentication/eye.svg`
          }
          onClick={handleTogglePassword}
        />
      </div>
      <Button
        width={38}
        height={6.4}
        type="submit">
        Створити аккаунт
      </Button>
    </form>
  );
}

export default Registretion;
