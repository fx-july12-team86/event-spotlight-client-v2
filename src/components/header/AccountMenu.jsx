import { Link } from "react-router";
import styles from "./styles/accountMenu.module.scss";

function AccountMenu({ isHidden }) {
  return (
    <div className={`${styles.box} ${isHidden ? styles.Hidden : ""}`}>
      <Link
        to="/"
        className={styles.box__account}>
        Мій профіль
      </Link>
      <Link
        to="/"
        className={styles.box__favorites}>
        Улюблене
      </Link>
      <Link
        to="/"
        className={styles.box__events}>
        Мої події
      </Link>
      <button className={styles.box__exit}>Вийти</button>
    </div>
  );
}

export default AccountMenu;
