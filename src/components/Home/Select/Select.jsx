import { useState } from "react";
import styles from "./styles/select.module.scss";

const options = [
  "За датою",
  "За назвою (від А до Я)",
  "За популярністю",
  "За ціною (від найменшої)",
  "За ціною (від найбільшої)",
];

function Select() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, SetSelected] = useState(options[0]);

  return (
    <ul
      onClick={() => setIsOpen((isOpen) => !isOpen)}
      className={`${styles.select} ${isOpen ? styles.isOpen : ""}`}>
      <div className={styles.select__header}>{selected}</div>
      <ul className={styles.select__options}>
        {options.map((option) => (
          <li
            onClick={() => SetSelected(option)}
            className={styles.select__options__item}
            key={option}>
            {option}
          </li>
        ))}
      </ul>
    </ul>
  );
}

export default Select;
