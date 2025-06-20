import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

import styles from "./styles/profile.module.scss";

import Button from "../../components/Buttons/Button";

import {
  getUserData,
  updateUserData,
  updateUserPassword,
} from "../../services/apiUser";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Profile() {
  const [nikname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const userData = useLoaderData();

  function handleToggleVisibility() {
    setIsVisiblePassword((prev) => !prev);
  }

  async function handleSubmitUserData(event) {
    event.preventDefault();
    const respose = await updateUserData({ username: nikname });
    if (respose) {
      alert("Ім'я змінено!");
    }
  }

  function handleSubmitUserPassword(event) {
    event.preventDefault();
    console.log(1);
    if (password !== repeatPassword || password.length <= 2) {
      alert("Паролі не співпадають");
      return;
    }
    updateUserPassword({ oldPassword, newPassword: password });
  }

  useEffect(() => {
    setNickname(userData.userName);
    setEmail(userData.email);
  }, [userData]);

  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__title"]}>Мій профіль</h2>
      <div className={styles["container__info"]}>
        <p className={styles["container__info-title"]}>Інформація</p>
        <form
          className={styles["container__form"]}
          onSubmit={handleSubmitUserData}>
          <div className={styles["container__form-group"]}>
            <label htmlFor="profile-name">Ваше ім’я / нік / псевдонім</label>
            <input
              type="text"
              id="profile-name"
              placeholder="Аліса Ло"
              value={nikname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div className={styles["container__form-group"]}>
            <label htmlFor="profile-email">Email</label>
            <input
              type="email"
              id="profile-email"
              placeholder="myemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
              required
            />
          </div>
          <Button
            type="submit"
            isHollow="true"
            height={7.4}>
            Зберегти
          </Button>
        </form>
      </div>
      <div className={styles["container__password"]}>
        <p className={styles["container__password-title"]}>Пароль</p>
        <form
          className={styles["container__form"]}
          onSubmit={handleSubmitUserPassword}>
          <div className={styles["container__form-group"]}>
            <label htmlFor="old-password">Старий пароль</label>
            <div className={styles["container__password-container"]}>
              <input
                type={isVisiblePassword ? "text" : "password"}
                id="old-password"
                placeholder="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
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
          </div>
          <div className={styles["container__form-group"]}>
            <label htmlFor="profile-password">Новий пароль</label>
            <div className={styles["container__password-container"]}>
              <input
                type={isVisiblePassword ? "text" : "password"}
                id="profile-password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>
          <div className={styles["container__form-group"]}>
            <label htmlFor="repeat-password">Повторіть пароль</label>
            <div className={styles["container__password-container"]}>
              <input
                type={isVisiblePassword ? "text" : "password"}
                id="repeat-password"
                placeholder="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
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
          </div>
          <Button
            type="submit"
            isHollow="true"
            height={7.4}>
            Змінити пароль
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Profile;

export async function loader() {
  const userData = await getUserData();
  return userData;
}
