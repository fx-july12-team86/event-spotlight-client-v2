import { useState } from "react";

import styles from "./styles/selectCategory.module.scss";

const categories = [
  "Концерти",
  "Театр",
  "Стендап",
  "Діти",
  "Фестивалі",
  "Танці",
  "Вечірки",
  "Семінари і тренінги",
  "Спорт",
  "Екскурсії",
  "Творчій вечір",
  "Інше",
];

function SelectCategory({ category, onSetCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["container"]}>
      <div
        className={`${styles["container__selected"]} ${
          isOpen ? styles["container__selected--open"] : ""
        }
        `}
        onClick={() => {
          setIsOpen((state) => !state);
        }}>
        <p>{category}</p>
      </div>
      <div
        className={`${styles["container__list-container"]} ${
          isOpen ? styles["container__list-container--open"] : ""
        }`}>
        <ul className={styles["container__list"]}>
          {categories.map((category) => (
            <li
              key={category}
              className={styles["container__list-item"]}
              onClick={() => {
                onSetCategory(category);
                setIsOpen(false);
              }}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectCategory;
