import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { get } from "lodash";

import styles from "./styles/home.module.scss";

import Filter from "./components/Filter/Filter";
import Slider from "./components/Slider/Slider";
import SearchBar from "../../components/SearchBar/SearchBar";
import EventList from "../../components/Eventlist/EventList";
import Button from "../../components/Buttons/Button";
import Organizer from "./components/Organizer/Organizer";

import {
  updateGeneralEvents,
  updateTopEventsCity,
  updateOnlineEvents,
} from "../../Context/dataEventsSlice";

import {
  getEvents,
  getEventsCity,
  getEventsOnline,
} from "../../services/apiEvents";
import Spinner from "../../components/Spinner/Spinner";

function Home() {
  const dispatch = useDispatch();

  const { city } = useSelector((state) => state.city);
  const [generalEventsFetch, topEventsCityFetch, eventsOnlineFetch] =
    useLoaderData();

  const { generalEvents, topEventsCity, onlineEvents, closestEvents, status } =
    useSelector((store) => store.events);

  useEffect(() => {
    dispatch(updateGeneralEvents(generalEventsFetch));
    dispatch(updateTopEventsCity(topEventsCityFetch));
    dispatch(updateOnlineEvents(eventsOnlineFetch));
  }, [dispatch, generalEventsFetch, topEventsCityFetch, eventsOnlineFetch]);

  useEffect(() => {
    async function fetchCityEvents() {
      try {
        const data = await getEventsCity(city);
        dispatch(updateTopEventsCity(data));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchCityEvents();
  }, [dispatch, city]);

  return (
    <div className={styles["container"]}>
      <Filter />
      <div className={styles["container__slider"]}>
        <Slider />
      </div>
      <h2 className={styles["container__title"]}>
        Знайди <span>подію</span> для себе
      </h2>
      <SearchBar />
      {status === "loading" && <Spinner />}
      {status === "ready" && <EventList events={generalEvents} />}
      <h2 className={styles["container__title"]}>
        Топ події <span>{city}</span>
      </h2>
      <EventList events={topEventsCity} />
      <Button
        isHollow={true}
        width={31.2}
        height={6.4}
        isCenter={true}>
        Більше подій
      </Button>
      <h2 className={styles["container__title"]}>
        <span>Онлайн</span> події
      </h2>
      <EventList events={onlineEvents} />
      <Button
        isHollow={true}
        width={31.2}
        height={6.4}
        isCenter={true}>
        Більше подій
      </Button>
      <Organizer />
      <h2 className={styles["container__title"]}>
        <span>Найближчі</span> події
      </h2>
      <EventList events={topEventsCity} />
      <Button
        isHollow={true}
        width={31.2}
        height={6.4}
        isCenter={true}>
        Більше подій
      </Button>
    </div>
  );
}

export async function loader() {
  const [generalEventsFetch, topEventsCityFetch, eventsOnlineFetch] =
    await Promise.all([getEvents(), getEventsCity("Київ"), getEventsOnline()]);
  return [generalEventsFetch, topEventsCityFetch, eventsOnlineFetch];
}
// export async function loader() {
//   const data = await getEvents();

//   return data;
// }

export default Home;
