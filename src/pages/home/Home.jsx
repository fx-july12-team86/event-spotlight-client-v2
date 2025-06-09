import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useSearchParams } from "react-router";

import styles from "./styles/home.module.scss";

import Filter from "./components/Filter/Filter";
import Slider from "./components/Slider/Slider";
import SearchBar from "../../components/SearchBar/SearchBar";
import EventList from "../../components/Eventlist/EventList";
import Button from "../../components/Buttons/Button";
import Organizer from "./components/Organizer/Organizer";

import Spinner from "../../components/Spinner/Spinner";

import {
  setGeneralEvents,
  setTopEventsCity,
  setOnlineEvents,
} from "../../context/dataEventsSlice";

import {
  getEvents,
  getEventsByCity,
  getEventsOnline,
} from "../../services/apiEvents";

function Home() {
  const [loading, setLoading] = useState(true);

  const { generalEvents, topEventsCity, onlineEvents, status } = useSelector(
    (store) => store.events
  );

  const { city } = useSelector((store) => store.city);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [general, online] = await Promise.all([
          getEvents(),
          getEventsOnline(),
        ]);
        dispatch(setGeneralEvents(general));
        dispatch(setOnlineEvents(online));
      } catch (err) {
        console.error("Помилка при завантаженні подій:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchInitialDataCity() {
      try {
        const topCity = await getEventsByCity(city || "Київ");

        dispatch(setTopEventsCity(topCity));
      } catch (err) {
        console.error("Помилка при завантаженні подій:", err.message);
      } finally {
        // setLoading(false);
      }
    }

    fetchInitialDataCity();
  }, [city]);

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

export default Home;
