import { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./styles/searchEvent.module.scss";

function SearchEvent({ width, heigh, paddingLeft, handleClickCross }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!query) return;
    navigate(`/events/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <label onClick={handleClickCross}></label>
    </form>
  );
}

export default SearchEvent;
