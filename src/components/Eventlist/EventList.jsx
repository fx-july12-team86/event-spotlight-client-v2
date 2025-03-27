import styles from "./styles/eventList.module.scss";

import EventItem from "./EventItem";
import { useSelector } from "react-redux";

function EventList({ events }) {
  return (
    <div className={styles["container"]}>
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
