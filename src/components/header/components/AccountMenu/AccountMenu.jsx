import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/accountMenu.module.scss";

import { logOut as logOutAction } from "../../../../context/userSlice";
import { useEffect } from "react";

function AccountMenu({
  isHidden,
  onHandleToggleLogin,
  onSetIsHiddenAccountMenu,
}) {
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function logOut() {
    dispatch(logOutAction());
    navigate("/");
  }

  useEffect(() => {
    console.log(location.search);
    onSetIsHiddenAccountMenu(true);
  }, [location.search]);

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
