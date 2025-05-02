import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router";

import styles from "./styles/filter.module.scss";

import FilterFull from "./FilterFull";

const categories = ["Концерти", "Театр", "Стендап", "Діти", "Фестивалі"];

function Filter() {
  const [isHidden, setIsHidden] = useState(true);

  function handleHidden() {
    setIsHidden((isHidden) => !isHidden);
  }

  return (
    <nav className={styles["container"]}>
      <ul className={styles["container__nav"]}>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/catalog?filter=${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
      <button
        className={!isHidden ? styles["isActive"] : ""}
        onClick={handleHidden}>
        Інше
      </button>
      <FilterFull isHidden={isHidden} />
    </nav>
  );
}

export default Filter;
