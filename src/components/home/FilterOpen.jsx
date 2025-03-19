import styles from "./styles/filterOpen.module.scss";

const categories = [
  "Вечірки",
  "Театр",
  "Кіно",
  "Спорт",
  "Конференції",
  "Семінари",
  "Тренінги",
  "Екскурсії",
  "Стендапи",
  "Музеї",
  "Шоу",
  "Інше",
  "Всі події",
  "Онлайн події",
  "Безкоштовні події",
];

function FilterOpen({ isHidden }) {
  return (
    <ul
      className={`${styles["categoryList"]} ${
        isHidden ? styles["isHidden"] : ""
      }`}
      style={{ height: `${isHidden ? 0 : 59}rem` }}>
      {categories.map((category) => (
        <li key={category}>{category} </li>
      ))}
    </ul>
  );
}

export default FilterOpen;
