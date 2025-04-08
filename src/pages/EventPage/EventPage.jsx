import { useLoaderData } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/eventPage.module.scss";

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Spinner from "../../components/Spinner/Spinner";

import { getEventById, getEventsByFilter } from "../../services/apiEvents";
import { updateCurrentEventData } from "../../Context/currentEventSlice";
import EventList from "../../components/Eventlist/EventList";

function EventPage() {
  const dispatch = useDispatch();
  const [eventDataFetch, similarEventsWithoutCurrent] = useLoaderData();

  const eventData = useSelector((store) => store.currentEvent.data);

  useEffect(() => {
    dispatch(updateCurrentEventData(eventDataFetch));
  }, [dispatch, eventDataFetch]);

  return (
    <div className={styles["container"]}>
      <Header />
      <Content />
      <h2>подібні події</h2>
      <EventList events={similarEventsWithoutCurrent} />
    </div>
  );
}

export default EventPage;

export async function loader({ params }) {
  const { id } = params;

  const eventDataFetch = await getEventById(id);

  const similarEventsFetch = await getEventsByFilter({
    categories: [`${eventDataFetch.categories.at(0).name}`],
  });

  const similarEventsWithoutCurrent = await similarEventsFetch.filter(
    (event) => event.id !== Number(id)
  ); // Исключает из массива событий событие, которые пользователь открыл

  return [eventDataFetch, similarEventsWithoutCurrent];
}
