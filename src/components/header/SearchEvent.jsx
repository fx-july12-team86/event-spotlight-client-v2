import { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./styles/searchEvent.module.scss";

function SearchEvent({
  width,
  heigh,
  paddingLeft,
  handleClickCross,
  isHiddenSearchInput,
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!query) return;
    navigate(`/events/${query}`);
    setQuery("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={isHiddenSearchInput ? styles.isHidden : ""}>
      <input
        style={{
          width: `${width}rem`,
          height: `${heigh}rem`,
          paddingLeft: `${paddingLeft}rem`,
        }}
        className={styles.input}
        type="text"
        placeholder="Пошук"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <label
        className={styles.label}
        onClick={handleClickCross}></label>
    </form>
  );
}

export default SearchEvent;
