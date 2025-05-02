import { useState } from "react";

import styles from "./styles/registretion.module.scss";

import Button from "../../../../Buttons/Button";

import { AccountRegistration } from "../../../../../services/apiLogin";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const data = AccountRegistration(userName, email, password);
    console.log(data);
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
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className={styles["container__nikname"]}>
        <label htmlFor="nikname">Ваше ім'я / нік / псевдонім</label>
        <input
          placeholder="qwerdx12345"
          type="text"
          name=""
          id="nikname"
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div className={styles["container__password"]}>
        <label htmlFor="password">Пароль</label>
        <input
          placeholder="qwerdx12345"
          type={!isVisiblePassword ? "password" : "text"}
          name=""
          id="password"
          onChange={(event) => setPassword(event.target.value)}
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

export default Registration;
