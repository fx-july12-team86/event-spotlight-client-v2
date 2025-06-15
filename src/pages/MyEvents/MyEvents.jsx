import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useDispatch } from "react-redux";

import styles from "./styles/myEvents.module.scss";

import { getUserEvents } from "../../services/apiUser";
import { setActiveEvents } from "../../context/userEventsSlice";
import { deleteEvent } from "../../services/apiEvents";

import Content from "./components/Content/Content";
import WelcomeModalAfterSubmit from "./components/WelcomeModalAfterSubmit/ModalWindow";
import ApproveDeleteEvent from "./components/ApproveDeleteModal/ApproveDeleteEvent";
import Spinner from "../../components/Spinner/Spinner";

function MyEvents() {
  const [activeEventsLocal, setActiveEventsLocal] = useState("");

  const [isActiveModal, setIsActiveModal] = useState(false);

  const [approveDeleteEvent, setApproveDeleteEvent] = useState(false);
  const [isDeletingEvent, setIsDeletingEvent] = useState(false);

  const [idEventDelete, setIdEventDelete] = useState([]);

  const dispatch = useDispatch();

  const userEvents = useLoaderData();

  useEffect(() => {
    dispatch(setActiveEvents(userEvents.eventDtos));
    setActiveEventsLocal(userEvents.eventDtos);
  }, [userEvents]);

  useEffect(() => {
    if (location.state?.showModal) {
      setIsActiveModal(true);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  async function handleDeleteEvent() {
    setIsDeletingEvent(true);
    const response = await deleteEvent(idEventDelete);

    if (response) {
      setIsDeletingEvent(false);
      setApproveDeleteEvent(false);
      const updatedEvents = activeEventsLocal.filter(
        (event) => event.id !== idEventDelete
      );
      setActiveEventsLocal(updatedEvents);
      dispatch(setActiveEvents(updatedEvents));
    }
  }

  return (
    <>
      <div className={styles["container"]}>
        <h2 className={styles["container__header"]}>Мої події</h2>
        <Content
          approveDeleteEvent={approveDeleteEvent}
          onSetApproveDeleteEvent={setApproveDeleteEvent}
          onSetIdEventDelete={setIdEventDelete}
        />
      </div>
      {isActiveModal && (
        <WelcomeModalAfterSubmit
          approveDeleteEvent={approveDeleteEvent}
          onSetApproveDeleteEvent={setApproveDeleteEvent}
          onSetIsActiveModal={setIsActiveModal}
        />
      )}
      {approveDeleteEvent && !isDeletingEvent && (
        <ApproveDeleteEvent
          onSetApproveDeleteEvent={setApproveDeleteEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}
      {isDeletingEvent && (
        <div className={styles["spinner-container"]}>
          <div className={styles["spinner-container__spinner"]}>
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
}

export default MyEvents;

export async function loader() {
  const userEvents = await getUserEvents();
  return userEvents;
}
