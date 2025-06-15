import { useLoaderData } from "react-router";

import styles from "./styles/favorites.module.scss";

import { getFavorites } from "../../services/apiEvents";

import EventList from "../../components/Eventlist/EventList";

function Favorites() {
  const { events } = useLoaderData();

  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__favorites"]}>Улюблене</h2>
      {events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <p>На даний момент у вас немає улюблених івентів</p>
      )}
    </div>
  );
}

export default Favorites;

export async function loader() {
  const events = await getFavorites();
  return events;
}
