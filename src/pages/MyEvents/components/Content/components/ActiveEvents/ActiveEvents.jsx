import { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./styles/activeEvents.module.scss";

import { deleteEvent } from "../../../../../../services/apiEvents";

import Spinner from "../../../../../../components/Spinner/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ActiveEvents({
  approveDeleteEvent,
  onSetApproveDeleteEvent,
  onSetIdEventDelete,
  events,
}) {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  function handleDeleteEvent(event, id) {
    event.stopPropagation();
    onSetApproveDeleteEvent(true);
    onSetIdEventDelete(id);
  }

  function handleNavigateToEventPage(id) {
    navigate(`/event/${id}`);
  }

  function handleNavigateToEditPage(event, id) {
    event.stopPropagation();
    navigate(`/edit-event/${id}`);
  }

  return events.map((event) => {
    const imgUrl = event.photo?.sharedUrl?.replace("dl=0", "raw=1");

    return (
      <div
        key={event.id}
        className={styles["event-item"]}
        onClick={() => handleNavigateToEventPage(event.id)}>
        {isLoading && (
          <div
            style={{
              width: "100%",
              height: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Spinner />
          </div>
        )}
        <img
          src={imgUrl}
          alt={event.title}
          className={styles["event-item__image"]}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
        <div className={styles["event-item__description"]}>
          <div>
            <p className={styles["event-item__category"]}>
              {event.categoryName}
            </p>
            <p className={styles["event-item__title"]}>{event.title}</p>
          </div>
          <div className={styles["event-item__edit"]}>
            <button onClick={(e) => handleNavigateToEditPage(e, event.id)}>
              <svg className={styles["event-item__svgSizeNormalize"]}>
                <use
                  href={`${BASE_URL}/icons/MyEvents/pencil.svg#pencil`}></use>
              </svg>
            </button>
            <button>
              <svg className={styles["event-item__svgSizeNormalize"]}>
                <use href={`${BASE_URL}/icons/MyEvents/pause.svg#pause`}></use>
              </svg>
            </button>
            <button onClick={(e) => handleDeleteEvent(e, event.id)}>
              <svg className={styles["event-item__svgSizeNormalize"]}>
                <use href={`${BASE_URL}/icons/MyEvents/delete.svg#trash`}></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  });
}

export default ActiveEvents;
