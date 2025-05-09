import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import styles from "./styles/content.module.scss";

import Spinner from "../../../../components/Spinner/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ActiveEvents({ events }) {
  const [isLoading, setIsLoading] = useState(true);

  return events.map((event) => {
    const imgUrl = event.photo.sharedUrl.replace("dl=0", "raw=1");
    return (
      <div
        key={event.id}
        className={styles["event-item"]}>
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
            <button>
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
            <button>
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

function Content() {
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
        {activeTab === "active" && <ActiveEvents events={userEventsData} />}
      </div>
    </div>
  );
}

export default Content;
