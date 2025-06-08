import styles from "./errorMessage.module.scss";

function ErrorMessage({ children }) {
  return <p className={styles["message"]}>{children}</p>;
}

export default ErrorMessage;
