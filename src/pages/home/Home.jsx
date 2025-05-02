import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useSearchParams } from "react-router";
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
  getEventsByCity,
  getEventsOnline,
} from "../../services/apiEvents";
import Spinner from "../../components/Spinner/Spinner";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { generalEvents, topEventsCity, onlineEvents, status } = useSelector(
    (store) => store.events
  );

  const [generalEventsFetch, topEventsCityFetch, eventsOnlineFetch] =
    useLoaderData();

  const { city } = useSelector((state) => state.city);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateGeneralEvents(generalEventsFetch));
    dispatch(updateTopEventsCity(topEventsCityFetch));
    dispatch(updateOnlineEvents(eventsOnlineFetch));
  }, [dispatch, generalEventsFetch, topEventsCityFetch, eventsOnlineFetch]);

  useEffect(() => {
    async function fetchCityEvents() {
      try {
        const data = await getEventsByCity(city);
        dispatch(updateTopEventsCity(data));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchCityEvents();
  }, [dispatch, city]);

  // useEffect(()=>{
  //   const
  // },[])

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
      <Link to="/catalog">
        <Button
          isHollow={true}
          width={31.2}
          height={6.4}>
          Більше подій
        </Button>
      </Link>
      <h2 className={styles["container__title"]}>
        <span>Онлайн</span> події
      </h2>
      <EventList events={onlineEvents} />
      <Link to="/catalog">
        <Button
          isHollow={true}
          width={31.2}
          height={6.4}>
          Більше подій
        </Button>
      </Link>
      <Organizer />
      <h2 className={styles["container__title"]}>
        <span>Найближчі</span> події
      </h2>
      <EventList events={topEventsCity} />
      <Link to="/catalog">
        <Button
          isHollow={true}
          width={31.2}
          height={6.4}>
          Більше подій
        </Button>
      </Link>
    </div>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const city = url.searchParams.get("city") || "Київ";

  const [generalEventsFetch, topEventsCityFetch, eventsOnlineFetch] =
    await Promise.all([getEvents(), getEventsByCity(city), getEventsOnline()]);
  return [generalEventsFetch, topEventsCityFetch, eventsOnlineFetch];
}

export default Home;
