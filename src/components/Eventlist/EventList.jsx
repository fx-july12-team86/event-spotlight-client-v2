import styles from "./styles/eventList.module.scss";

import EventItem from "./EventItem";
import { useSelector } from "react-redux";

function EventList({ events, marginTop = 5.6 }) {
  return (
    <div
      className={styles["container"]}
      style={{ marginTop: `${marginTop}rem` }}>
      {events.map((event) => (
        <EventItem
          key={event.id}
          data={event}
        />
      ))}
    </div>
  );
}

export default EventList;
