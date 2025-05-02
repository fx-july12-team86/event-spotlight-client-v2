import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./styles/login.module.scss";

import Button from "../../../../Buttons/Button";

import {
  updateIsAuthenticated,
  updateToken,
} from "../../../../../context/userSlice";

import { LogIn } from "../../../../../services/apiLogin";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login({ onHandleToggleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "" });

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await LogIn(email, password);

      dispatch(updateIsAuthenticated(true));
      dispatch(updateToken(data.token));

      onHandleToggleLogin();

      setEmail("");
      setPassword("");
    } catch (error) {
      setErrors({
        email: "Невірний логін",
        password: "Невірний пароль",
      });
    }
  }

  function handleToggleVisibility() {
    setIsVisiblePassword((prev) => !prev);
  }

  return (
    <form
      className={styles["container"]}
      onSubmit={handleSubmit}>
      <div className={styles["container__email"]}>
        <label htmlFor="email">E-mail</label>
        <input
          className={errors.email ? styles["container__input-error"] : ""}
          placeholder="myemail@gmail.com"
          type="email"
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        {errors.email && (
          <span className={styles["container__error-text"]}>
            {errors.email}
          </span>
        )}
      </div>
      <div className={styles["container__password"]}>
        <label htmlFor="password">Пароль</label>
        <div className={styles["container__input-wrapper"]}>
          <input
            className={errors.password ? styles["container__input-error"] : ""}
            placeholder="qwerdx12345"
            type={!isVisiblePassword ? "password" : "text"}
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          <img
            className={styles["container__img"]}
            src={
              !isVisiblePassword
                ? `${BASE_URL}/icons/Header/Authentication/eyeClose.svg`
                : `${BASE_URL}/icons/Header/Authentication/eye.svg`
            }
            onClick={handleToggleVisibility}
          />
        </div>
        {errors.password && (
          <span className={styles["container__error-text"]}>
            {errors.password}
          </span>
        )}
      </div>
      <Button
        width={38}
        height={6.4}
        type="submit">
        Увійти
      </Button>
    </form>
  );
}

export default Login;
