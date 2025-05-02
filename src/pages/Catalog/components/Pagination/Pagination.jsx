import { useState } from "react";

import styles from "./styles/pagination.module.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Pagination = ({ totalPages = 1, currentPage, onSetCurrentPage }) => {
  const getPages = () => {
    const pages = [];

    // Маленька кількість сторінок — просто всі
    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const left = 1;
    const right = totalPages;

    // Початок списку
    if (currentPage <= 4) {
      pages.push(...[1, 2, 3, 4, 5, 6, "dots", right]);
    }
    // Кінець списку
    else if (currentPage >= totalPages - 3) {
      pages.push(
        left,
        "dots",
        ...[
          totalPages - 5,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ]
      );
    }
    // Центр
    else {
      pages.push(
        left,
        "dots",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "dots",
        right
      );

      // Додаємо ще один пункт, щоб було 8: вставимо currentPage - 2 або +2
      if (pages.length < 8) {
        if (currentPage - 2 > 1) {
          pages.splice(2, 0, currentPage - 2); // вставляємо після 1 і dots
        } else {
          pages.splice(5, 0, currentPage + 2); // вставляємо перед другим dots
        }
      }
    }

    return pages.slice(0, 8); // гарантуємо, що точно 8
  };

  return (
    <div className={styles["container"]}>
      <button
        className={styles["container__btn"]}
        onClick={() =>
          // onSetCurrentPage((currentPage) =>
          //   currentPage > 1 ? currentPage - 1 : ""
          // )
          onSetCurrentPage(currentPage > 1 ? currentPage - 1 : "")
        }>
        <svg className={styles["svgSizeNormalize"]}>
          <use href={`${BASE_URL}/icons/General/arrows.svg#arrowPrev`}></use>
        </svg>
      </button>

      <ul className={styles["container__btn-list"]}>
        {getPages().map((btn, index) => (
          <li
            key={index}
            className={
              currentPage === btn ? styles["container__btn--selected"] : ""
            }>
            {btn === "dots" ? (
              <span className={styles["container__btn-dots"]}>...</span>
            ) : (
              <button
                className={
                  currentPage === btn
                    ? `${styles["container__btn"]} ${styles["container__btn--selected"]}`
                    : styles["container__btn"]
                }
                onClick={() => onSetCurrentPage(btn)}>
                {btn}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        className={styles["container__btn"]}
        onClick={() =>
          // onSetCurrentPage((currentPage) =>
          //   currentPage < totalPages ? currentPage + 1 : ""
          // )
          onSetCurrentPage(currentPage < totalPages ? currentPage + 1 : "")
        }>
        <svg className={styles["svgSizeNormalize"]}>
          <use href={`${BASE_URL}/icons/General/arrows.svg#arrowNext`}></use>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
