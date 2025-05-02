import { Link } from "react-router";

import styles from "./styles/filterFull.module.scss";

const categories = [
  "Танці",
  "Вечірки",
  "Семінари і тренінги",
  "Спорт",
  "Екскурсії",
  "Творчій вечір",
  "Інше",
];

function FilterOpen({ isHidden }) {
  return (
    <div
      className={styles["container-list"]}
      style={{ height: `${isHidden ? 0 : 40}rem` }}>
      <ul
        className={`${styles["container-list__category-list"]} ${
          isHidden ? styles["isHidden"] : ""
        }`}
        // style={{ height: `${isHidden ? 0 : 40}rem` }}>
        style={{ transform: `translateY(${isHidden ? "-100%" : "0"})` }}>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/catalog?filter=${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterOpen;
