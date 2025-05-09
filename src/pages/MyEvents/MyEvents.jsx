import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useDispatch } from "react-redux";

import styles from "./styles/myEvents.module.scss";

import Content from "./components/Content/Content";

import { getUserEvents } from "../../services/apiUser";
import { updateActiveEvents } from "../../context/userEventsSlice";

function MyEvents() {
  const dispatch = useDispatch();

  const userEvents = useLoaderData();

  useEffect(() => {
    dispatch(updateActiveEvents(userEvents.eventDtos));
  }, [userEvents]);

  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__header"]}>Мої події</h2>
      <Content />
    </div>
  );
}

export default MyEvents;

export async function loader() {
  const userEvents = await getUserEvents();
  return userEvents;
}
