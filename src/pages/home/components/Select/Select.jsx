import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./styles/select.module.scss";

import { updateSortBy } from "../../../../context/filtersSlice";
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

  const dispatch = useDispatch();

  function handleUpdateSortBy(option) {
    dispatch(updateSortBy(option));
  }

  return (
    <ul
      onClick={() => setIsOpen((isOpen) => !isOpen)}
      className={`${styles.select} ${isOpen ? styles.isOpen : ""}`}>
      <div className={styles.select__header}>{selected}</div>
      <ul className={styles.select__options}>
        {options.map((option) => (
          <li
            onClick={() => {
              SetSelected(option);
              handleUpdateSortBy(option);
            }}
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
