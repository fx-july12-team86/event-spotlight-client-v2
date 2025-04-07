import { useLoaderData } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/eventPage.module.scss";

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Spinner from "../../components/Spinner/Spinner";

import { getEventById } from "../../services/apiEvents";
import { updateCurrentEventData } from "../../Context/currentEventSlice";

function EventPage() {
  const dispatch = useDispatch();
  const currentEventFetch = useLoaderData();

  const eventData = useSelector((store) => store.currentEvent.data);

  useEffect(() => {
    dispatch(updateCurrentEventData(currentEventFetch));
  }, [dispatch, currentEventFetch]);

  return (
    <div className={styles["container"]}>
      {!eventData ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <Content />
        </>
      )}
    </div>
  );
}

export default EventPage;

export async function loader({ params }) {
  const { id } = params;
  const data = await getEventById(id);
  return data;
}
