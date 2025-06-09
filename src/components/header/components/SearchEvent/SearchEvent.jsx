import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import styles from "./styles/searchEvent.module.scss";
import { useSelector } from "react-redux";

function SearchEvent({
  width,
  heigh,
  paddingLeft,
  handleClickCross,
  isHiddenSearchInput,
}) {
  const [query, setQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { filters, datesRange } = useSelector((store) => store.filters);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!query) return;

    const params = new URLSearchParams(searchParams);

    if (query) params.set("search", query);
    if (filters.length) filters.forEach((f) => params.append("filter", f));
    if (datesRange.length === 2) {
      const [from, to] = datesRange;
      params.set("dateFrom", from);
      params.set("dateTo", to);
    }

    params.set("page", "1");
    params.set("trigger", "1");

    if (location.pathname !== "/catalog") {
      navigate(`/catalog?${params.toString()}`, { replace: true });
    } else {
      setSearchParams(params, { replace: true });
    }

    setQuery("");
  }

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   navigate(`/catalog?query=${query}`);
  //   setQuery("");
  // }

  return (
    <form
      onSubmit={handleSubmit}
      className={isHiddenSearchInput ? styles["isHidden"] : ""}>
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
        className={styles["label"]}
        onClick={handleClickCross}></label>
    </form>
  );
}

export default SearchEvent;
