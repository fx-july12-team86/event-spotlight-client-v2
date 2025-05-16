import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useSearchParams } from "react-router";

import styles from "./styles/catalog.module.scss";

import SearchBar from "../../components/SearchBar/SearchBar";
import EventList from "../../components/Eventlist/EventList";
import Pagination from "./components/Pagination/Pagination";

import { getEventsCatalog } from "../../services/apiEvents";
import { updateCatalogEvents } from "../../Context/dataEventsSlice";

// { categories: filters, dateRange: datesRange, cities: city }

function Catalog() {
  const [firstLoad, setFirstLoad] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);

  const [catalogData, setCatalogData] = useState();

  const city = useSelector((store) => store.city.city);
  const { filters, sortBy, datesRange } = useSelector((store) => store.filters);
  const { catalogEvents } = useSelector((store) => store.events);

  const dispatch = useDispatch();

  const { pageCount: maxPages = 0 } = catalogData || {};

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const trigger = searchParams.get("trigger");
    const pageParam = searchParams.get("page") || "1";
    const pageFromUrl = parseInt(pageParam);

    const rawParams = {
      title: searchParams.get("search"),
      categories: filters,
      dateRange: datesRange.length ? [...datesRange] : undefined,
      cities: city ? [city] : undefined,
    };

    const cleanedParams = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([, value]) =>
          value !== undefined &&
          value !== null &&
          !(typeof value === "string" && value.trim() === "") &&
          !(Array.isArray(value) && value.length === 0)
      )
    );

    const shouldFetch = firstLoad || trigger === "1";
    if (!shouldFetch || !city) return;

    // console.log(sortBy);

    async function fetchEvents() {
      const data = await getEventsCatalog(
        cleanedParams,
        pageFromUrl - 1,
        sortBy
      );
      dispatch(updateCatalogEvents(data));
      setCurrentPage(pageFromUrl);
      setFirstLoad(false);

      if (trigger === "1") {
        const params = new URLSearchParams(searchParams);
        params.delete("trigger");
        setSearchParams(params, { replace: true });
      }
    }

    fetchEvents();
  }, [searchParams]);

  useEffect(() => {
    setCatalogData(catalogEvents);
  }, [catalogEvents]);

  function handleSetPage(page) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params, { replace: true });
    setCurrentPage(page);
  }
  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__city"]}>Події {city}</h2>
      <SearchBar />

      {catalogData?.events?.length > 0 ? (
        catalogData.events.map((period) => {
          return (
            <div
              className={styles["container__events-list"]}
              key={period.field}>
              <h2>
                {period.field} {currentYear}
              </h2>
              <EventList
                events={period.events}
                marginTop={4}
              />
            </div>
          );
        })
      ) : (
        <p className={styles["container__not-found-message"]}>
          За даними філтрами нічого не знайдено
        </p>
      )}
      <Pagination
        totalPages={maxPages}
        currentPage={currentPage}
        onSetCurrentPage={handleSetPage}
      />
    </div>
  );
}

export default Catalog;
