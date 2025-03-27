import { useState } from "react";
import FilterOpen from "./FilterOpen";
import styles from "./styles/filter.module.scss";

const categories = [
  "Концерти",
  "Майстер-класи",
  "Фестивалі",
  "Виставки",
  "Для дітей",
];

function Filter() {
  const [isHidden, setIsHidden] = useState(true);

  function handleHidden() {
    setIsHidden((isHidden) => !isHidden);
  }

  return (
    <nav className={styles["container"]}>
      <ul className={styles["container__nav"]}>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      <button
        className={!isHidden ? styles["isActive"] : ""}
        onClick={handleHidden}>
        Інше
      </button>
      <FilterOpen isHidden={isHidden} />
    </nav>
  );
}

export default Filter;
