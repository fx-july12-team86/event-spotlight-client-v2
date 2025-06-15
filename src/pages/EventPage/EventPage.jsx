import { useLoaderData, Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/eventPage.module.scss";

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Spinner from "../../components/Spinner/Spinner";
import EventList from "../../components/Eventlist/EventList";
import Button from "../../components/Buttons/Button";

import { getEventById, getEventsByFilter } from "../../services/apiEvents";
import { setCurrentEventData } from "../../context/currentEventSlice";

function EventPage() {
  const [selected, setSelected] = useState("details");

  const dispatch = useDispatch();
  const [eventDataFetch, similarEventsWithoutCurrent] = useLoaderData();

  useEffect(() => {
    dispatch(setCurrentEventData(eventDataFetch));
  }, [dispatch, eventDataFetch]);

  const scrollTo = useRef(null);

  return (
    <div className={styles["container"]}>
      <Header
        onSetSelected={setSelected}
        scrollTo={scrollTo}
      />
      <Content
        selected={selected}
        onSetSelected={setSelected}
        scrollTo={scrollTo}
      />
      <h2>подібні події</h2>
      <EventList events={similarEventsWithoutCurrent} />

      <Link to="/catalog">
        <Button
          width={31}
          height={6.4}
          isHollow={true}>
          Більше подій
        </Button>
      </Link>
    </div>
  );
}

export default EventPage;

export async function loader({ params }) {
  const { id } = params;

  const eventDataFetch = await getEventById(id);
  console.log(eventDataFetch);
  const similarEventsFetch = await getEventsByFilter({
    categories: [`${eventDataFetch.categories.at(0).name}`],
  });

  const similarEventsWithoutCurrent = await similarEventsFetch.filter(
    (event) => event.id !== Number(id)
  ); // Исключает из массива событий событие, которые пользователь открыл

  return [eventDataFetch, similarEventsWithoutCurrent];
}
