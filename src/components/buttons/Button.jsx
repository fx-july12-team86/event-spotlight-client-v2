import styles from "./styles/button.module.scss";

function Button({
  children = "textOfButton",
  width,
  height,
  isHollow = false,
}) {
  return (
    <button
      className={`${styles.buttonMain} ${
        isHollow ? styles.buttonHollow : styles.buttonNotHollow
      }`}
      style={{ width: `${width}rem`, height: `${height}rem` }}>
      {children}
    </button>
  );
}

export default Button;
