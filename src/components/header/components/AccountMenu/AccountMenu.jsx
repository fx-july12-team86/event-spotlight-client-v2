import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/accountMenu.module.scss";

import { logOut as logOutAction } from "../../../../context/userSlice";

function AccountMenu({ isHidden, onHandleToggleLogin }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function logOut() {
    // dispatch(updateToken(null));
    // dispatch(updateIsAuthenticated(false));
    dispatch(logOutAction());
    navigate("/");
  }

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
            to="/profile"
            className={styles["box__account"]}>
            Мій профіль
          </Link>
          <Link
            to="/favorites"
            className={styles["box__favorites"]}>
            Улюблене
          </Link>
          <Link
            to="/my-events"
            className={styles["box__events"]}>
            Мої події
          </Link>
          <button
            onClick={logOut}
            className={styles["box__exit"]}>
            Вийти
          </button>
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
