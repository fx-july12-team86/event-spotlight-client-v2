import { Link } from "react-router";
import styles from "./styles/footer.module.scss";

function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__content"]}>
        <Link
          to="/"
          className={styles["footer__logo"]}>
          EventSpotlight
        </Link>
        <main className={styles["footer__main"]}>
          <ul className={styles["footer__nav-list"]}>
            <li className={styles["footer__nav-item"]}>
              <Link to="/">Особистий кабінет</Link>
            </li>
            <li className={styles["footer__nav-item"]}>
              <Link to="/">Усі події</Link>
            </li>
            <li className={styles["footer__nav-item"]}>
              <Link to="/">Додати подію</Link>
            </li>
            <li className={styles["footer__nav-item"]}>
              <Link to="/">Про нас</Link>
            </li>
            <li className={styles["footer__nav-item"]}>
              <Link to="/">Зв'язатись з нами</Link>
            </li>
            <li className={styles["footer__nav-item"]}>
              <Link to="/">Контакти</Link>
            </li>
          </ul>
          <ul className={styles["footer__info-list"]}>
            <li className={styles["footer__info-item"]}>
              <Link to="/">Політика конфіденційності</Link>
            </li>
            <li className={styles["footer__info-item"]}>
              <Link to="/">Для організаторів</Link>
            </li>
          </ul>
        </main>
        <hr />
        <div className={styles["footer__copyright"]}>
          <p className={styles["footer__copyright-text"]}>
            © 2024 EventSpotlight
          </p>
          <p className={styles["footer__copyright-text"]}>
            Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
