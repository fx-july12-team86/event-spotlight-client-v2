import styles from "./header.module.scss";

import ErrorMessage from "../Error/ErrorMessage";

function Header({ step, title, description, errorMessage }) {
  return (
    <header className={styles["header"]}>
      <span className={styles["header__step-number"]}>{step}</span>
      <div className={styles["header__step-info"]}>
        <h3 className={styles["header__step-title"]}>{title}</h3>
        <p className={styles["header__step-description"]}>{description}</p>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    </header>
  );
}

export default Header;
