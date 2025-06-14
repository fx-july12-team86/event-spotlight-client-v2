import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useSearchParams } from "react-router";

import styles from "./styles/catalog.module.scss";

import SearchBar from "../../components/SearchBar/SearchBar";
import EventList from "../../components/Eventlist/EventList";
import Pagination from "./components/Pagination/Pagination";

import { getEventsCatalog } from "../../services/apiEvents";
import { setCatalogEvents } from "../../context/dataEventsSlice";

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);

  const [catalogData, setCatalogData] = useState();

  const city = useSelector((store) => store.city.city);
  const { filters, sortBy, datesRange } = useSelector((store) => store.filters);
  const { catalogEvents } = useSelector((store) => store.events);

  const dispatch = useDispatch();

  const { pageCount: maxPages = 0 } = catalogData || {};

  const currentYear = new Date().getFullYear();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const isReady = Boolean(city && filters && datesRange && sortBy);

  const getQueryParams = () => {
    const raw = {
      title: searchParams.get("search"),
      categories: filters,
      dateRange: datesRange.length ? [...datesRange] : undefined,
      cities: [city],
    };
    return Object.fromEntries(
      Object.entries(raw).filter(
        ([, v]) =>
          v !== undefined &&
          v !== null &&
          !(typeof v === "string" && v.trim() === "") &&
          !(Array.isArray(v) && v.length === 0)
      )
    );
  };

  useEffect(() => {
    if (!isReady) return;

    const fetchEvents = async () => {
      const data = await getEventsCatalog(
        getQueryParams(),
        pageFromUrl - 1,
        sortBy
      );
      dispatch(setCatalogEvents(data));
      setCurrentPage(pageFromUrl);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    fetchEvents();
  }, [searchParams, city, filters, datesRange, sortBy, dispatch]);
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
