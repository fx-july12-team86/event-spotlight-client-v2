import styles from "./styles/button.module.scss";

function Button({
  children = "textOfButton",
  width,
  height,
  isHollow = false,
  isCenter = false,
}) {
  return (
    <button
      className={`${styles["button-main"]} ${
        isHollow ? styles["button-hollow"] : styles["button-not-hollow"]
      }`}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
        margin: isCenter ? "0 auto" : undefined,
      }}>
      {children}
    </button>
  );
}

export default Button;
