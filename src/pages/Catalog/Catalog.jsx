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
    const pageParam = searchParams.get("page");

    if (!pageParam) {
      // Устанавливаем page=1 в URL и загружаем первую страницу
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      setSearchParams(params, { replace: true });
      async function fetchEvents() {
        const data = await getEventsCatalog({}, 0);
        // setCatalogData(data);
        dispatch(updateCatalogEvents(data));
      }
      fetchEvents();
      setCurrentPage(1);
    } else {
      const pageFromUrl = parseInt(pageParam);
      if (isNaN(pageFromUrl) || pageFromUrl < 1) {
        const params = new URLSearchParams(searchParams);

        params.set("page", "1");

        setSearchParams(params, { replace: true });

        async function fetchEvents() {
          const data = await getEventsCatalog({}, 0);
          // setCatalogData(data);
          dispatch(updateCatalogEvents(data));
        }

        fetchEvents();
        setCurrentPage(1);
      } else {
        // Загружаем указанную страницу
        async function fetchEvents() {
          const data = await getEventsCatalog({}, pageFromUrl - 1);
          // setCatalogData(data);
          dispatch(updateCatalogEvents(data));
        }
        fetchEvents();
        setCurrentPage(pageFromUrl);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Обновляем URL при изменении currentPage
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage.toString());
    setSearchParams(params, { replace: true });
  }, [currentPage]);

  useEffect(() => {
    setCatalogData(catalogEvents);
  }, [catalogEvents]);

  const handleSetPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params, { replace: true });
  };
  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__city"]}>Події {city}</h2>
      <SearchBar />

      {catalogData?.events?.map((period) => {
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
      })}
      <Pagination
        totalPages={maxPages}
        currentPage={currentPage}
        onSetCurrentPage={handleSetPage}
      />
    </div>
  );
}

export default Catalog;
