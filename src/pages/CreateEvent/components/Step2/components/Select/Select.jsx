import { useState } from "react";

import styles from "./styles/selectCategory.module.scss";

function Select({ currentOption, allOptions, onSetOption, isBlocked = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${styles["container"]} ${
        isBlocked ? styles["container--blocked"] : ""
      }`}>
      <div
        className={`${styles["container__selected"]} ${
          isOpen ? styles["container__selected--open"] : ""
        }
        `}
        onClick={() => {
          setIsOpen((state) => !state);
        }}>
        <p>{currentOption.name}</p>
      </div>
      <div
        className={`${styles["container__list-container"]} ${
          isOpen ? styles["container__list-container--open"] : ""
        }`}>
        <ul className={styles["container__list"]}>
          {allOptions.map((category) => (
            <li
              key={category.id}
              className={styles["container__list-item"]}
              onClick={() => {
                onSetOption(category);
                setIsOpen(false);
              }}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Select;
