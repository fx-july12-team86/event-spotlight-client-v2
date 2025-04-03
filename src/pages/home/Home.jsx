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
import { updateGeneralEvents } from "../../Context/dataEventsSlice";

import { getEvents } from "../../services/apiEvents";
import Spinner from "../../components/Spinner/Spinner";

function Home() {
  const dispatch = useDispatch();
  const data = useLoaderData();

  const { generalEvents, topEventsCity, onlineEvents, closestEvents, status } =
    useSelector((store) => store.events);

  useEffect(() => {
    dispatch(updateGeneralEvents(data));
  }, [dispatch, data]);

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
        Топа події <span>Київ</span>
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
      <EventList events={closestEvents} />
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
  const data = await getEvents();
  return data;
}

export default Home;
