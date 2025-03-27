import styles from "./styles/content.module.scss";

import { useState } from "react";

function Content() {
  const [selected, setSelected] = useState("details");
  const tabs = [
    { id: "details", label: "Деталі події", content: "Завантаження даних..." },
    { id: "location", label: "Локація", content: "Завантаження даних..." },
    { id: "contacts", label: "Контакти", content: "Завантаження даних..." },
  ];

  return (
    <div className={styles["container"]}>
      <nav className={styles["container__nav"]}>
        <ul className={styles["container__nav-list"]}>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`${styles["container__list-item"]} ${
                selected === tab.id
                  ? styles["container__list-item--selected"]
                  : ""
              }`}
              onClick={() => setSelected(tab.id)}
              role="button"
              tabIndex={0}>
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>
      <div>Content</div>
    </div>
  );
}

export default Content;
