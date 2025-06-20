import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./styles/content.module.scss";

import Spinner from "../../../../components/Spinner/Spinner";

function Description({ tabs }) {
  const [isLoading, setIsLoading] = useState(true);

  const { description, imgs } = tabs.find((tab) => tab.id === "details");

  const descriptionFormatted = description.split("\n");

  return (
    <>
      {descriptionFormatted.map((description) => {
        return <p>{description}</p>;
      })}
      {imgs.map((img, index) => {
        if (img) {
          return (
            <React.Fragment key={index}>
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
                onLoad={() => setIsLoading(false)}
                key={index + 1}
                src={img}
                alt={`description image ${index + 1}`}
              />
            </React.Fragment>
          );
        }
      })}
    </>
  );
}

function Location({ tabs, isOnline }) {
  const { location, cityName, street, number } = tabs.find(
    (tab) => tab.id === "location"
  );

  return (
    <>
      <p className={styles["container__location"]}>{location}</p>
      {!isOnline ? (
        <iframe
          width="100%"
          height="450"
          style={{ border: "1px solid #9B9CA2" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${cityName},+вул.+${street},+${number}&output=embed`}></iframe>
      ) : (
        ""
      )}
    </>
  );
}

function Contacts({ tabs, scrollTo }) {
  const { contacts } = tabs.find((tab) => tab.id === "contacts");

  return (
    <ul
      className={styles["container__contacts"]}
      ref={scrollTo}>
      {contacts.map(([key, value]) => {
        if (!value) return null;

        let href = "#";
        if (key === "phoneNumber") href = `tel:${value}`;
        else if (key === "email") href = `mailto:${value}`;
        else if (key === "instagram")
          href = `https://www.instagram.com/${value}`;
        else if (key === "telegram") href = `https://t.me/${value}`;
        else if (key === "facebook") href = `https://www.facebook.com/${value}`;
        else if (key === "officialWebsite") href = `${value}`;

        return (
          <li
            key={key}
            className={styles[`container__${key}`]}>
            <a
              href={href}
              target="blank">
              {value}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Content({ selected, onSetSelected, scrollTo }) {
  const eventData = useSelector((store) => store.currentEvent.data);

  if (eventData === null) {
    return;
  }

  const { isOnline } = eventData;

  const tabs = [
    {
      id: "details",
      label: "Деталі події",
      description: `${eventData.description.description}`,
      imgs: [
        eventData.photos?.at(1)?.sharedUrl?.replace("dl=0", "raw=1"),
        eventData.photos?.at(2)?.sharedUrl?.replace("dl=0", "raw=1"),
      ],
    },
    {
      id: "location",
      label: "Локація",
      location: !isOnline
        ? `${eventData.address.street} ${eventData.address.number}, м. ${eventData.address.cityName}`
        : "Ця подія проходить онлайн",
      cityName: !isOnline
        ? eventData.address.cityName
        : "Ця подія проходить онлайн",
      street: !isOnline
        ? eventData.address.street
        : "Ця подія проходить онлайн",
      number: !isOnline
        ? eventData.address.number
        : "Ця подія проходить онлайн",
    },
    {
      id: "contacts",
      label: "Контакти",
      contacts: Object.entries(eventData.contact || {}).slice(1),
    },
  ];

  return (
    <div className={styles["container"]}>
      <nav className={styles["container__nav"]}>
        <ul className={styles["container__nav-list"]}>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`${styles["container__list-item"]} ${
                selected === tab.id
                  ? styles["container__list-item--selected"]
                  : ""
              }`}
              onClick={() => onSetSelected(tab.id)}
              role="button"
              tabIndex={0}>
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles["container__description"]}>
        {selected === "details" && <Description tabs={tabs} />}
        {selected === "location" && (
          <Location
            tabs={tabs}
            isOnline={isOnline}
          />
        )}
        {selected === "contacts" && (
          <Contacts
            tabs={tabs}
            scrollTo={scrollTo}
          />
        )}
      </div>
    </div>
  );
}

export default Content;
