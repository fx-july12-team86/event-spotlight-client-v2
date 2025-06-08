import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import styles from "./styles/content.module.scss";

import ActiveEvents from "./components/ActiveEvents/ActiveEvents";

function Content({
  approveDeleteEvent,
  onSetApproveDeleteEvent,
  onSetIdEventDelete,
}) {
  const [activeTab, setActiveTab] = useState("active");

  const navigate = useNavigate();

  const userEventsData = useSelector((store) => store.userEvents.activeEvents);

  const tabs = [
    {
      id: "active",
      title: "Активні",
      content: "",
    },
    {
      id: "stopped",
      title: "Призупинені",
      content: "",
    },
    {
      id: "moderating",
      title: "На модерації",
      content: "",
    },
    {
      id: "archived",
      title: "Архів",
      content: "",
    },
  ];

  return (
    <div className={styles["container-content-content"]}>
      <div className={styles["container-content__tabs"]}>
        {tabs.map((tab) => {
          return (
            <p
              key={tab.id}
              className={`${styles["container-content__tab"]} ${
                tab.id === activeTab
                  ? styles["container-content__tab--active"]
                  : ""
              }`}
              onClick={() => {
                setActiveTab(tab.id);
              }}>
              {tab.title}
            </p>
          );
        })}
      </div>
      <div className={styles["container-content__grid"]}>
        <div className={styles["container-content__add-event"]}>
          <div className={styles["container-content__add-event-content"]}>
            <button
              type="button"
              onClick={() => {
                navigate("/create-event");
              }}>
              +
            </button>
            <p>Додати подію</p>
          </div>
        </div>
        {activeTab === "active" && (
          <ActiveEvents
            approveDeleteEvent={approveDeleteEvent}
            onSetApproveDeleteEvent={onSetApproveDeleteEvent}
            onSetIdEventDelete={onSetIdEventDelete}
            events={userEventsData}
          />
        )}
      </div>
    </div>
  );
}

export default Content;
