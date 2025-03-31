import { Link } from "react-router";
import { useSelector } from "react-redux";

import styles from "./styles/accountMenu.module.scss";

function AccountMenu({ isHidden, onHandleToggleLogin }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div
      className={`${styles["box"]} ${isHidden ? styles["Hidden"] : ""}`}
      style={{
        height: isAuthenticated ? `${32}rem` : `${7}rem`,
        width: isAuthenticated ? `${23.6}rem` : `${17}rem`,
      }}>
      {isAuthenticated ? (
        <>
          <Link
            to="/"
            className={styles["box__account"]}>
            Мій профіль
          </Link>
          <Link
            to="/"
            className={styles["box__favorites"]}>
            Улюблене
          </Link>
          <Link
            to="/"
            className={styles["box__events"]}>
            Мої події
          </Link>
          <button className={styles["box__exit"]}>Вийти</button>
        </>
      ) : (
        <button
          className={styles["box__login"]}
          onClick={onHandleToggleLogin}>
          Увійти
        </button>
      )}
    </div>
  );
}

export default AccountMenu;
