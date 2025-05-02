import { Link } from "react-router";

import styles from "./styles/filterOpen.module.scss";

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
    <ul
      className={`${styles["categoryList"]} ${
        isHidden ? styles["isHidden"] : ""
      }`}
      style={{ height: `${isHidden ? 0 : 59}rem` }}>
      {categories.map((category) => (
        <li key={category}>
          <Link to={`/catalog?filter=${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  );
}

export default FilterOpen;
