import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./styles/content.module.scss";

import Spinner from "../../../../components/Spinner/Spinner";

function Description({ tabs }) {
  const [isLoading, setIsLoading] = useState(true);

  const { description, imgs } = tabs.find((tab) => tab.id === "details");

  return (
    <>
      <p>{description}</p>
      {imgs.map((img, index) => {
        if (img) {
          return (
            <>
              {isLoading && (
                <div
                  key={index}
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
            </>
          );
        }
      })}
    </>
  );
}

function Location({ tabs }) {
  const { location, cityName, street, number } = tabs.find(
    (tab) => tab.id === "location"
  );

  return (
    <>
      <p className={styles["container__location"]}>{location}</p>
      <iframe
        width="100%"
        height="450"
        style={{ border: "1px solid #9B9CA2" }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${cityName},+вул.+${street},+${number}&output=embed`}></iframe>
    </>
  );
}

function Contacts({ tabs }) {
  const { contacts } = tabs.find((tab) => tab.id === "contacts");

  return (
    <ul className={styles["container__contacts"]}>
      {contacts.map(([key, value]) => {
        return (
          <li
            key={key}
            className={styles[`container__${key}`]}>
            {key === "phoneNumber" && (
              <Link href={`tel:${value}`}>{value}</Link>
            )}
            {key === "email" && <Link href={`mailto:${value}`}>{value}</Link>}
            {key === "instagram" && (
              <Link href={`https://www.instagram.com/${value}`}>{value}</Link>
            )}
            {key === "telegram" && (
              <Link href={`https://t.me/${value}`}>{value}</Link>
            )}
            {key === "facebook" && (
              <Link href={`https://www.facebook.com/${value}`}>{value}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Content() {
  const [selected, setSelected] = useState("details");

  const eventData = useSelector((store) => store.currentEvent.data);

  if (eventData === null) {
    return;
  }

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
      location: `${eventData.address.street} ${eventData.address.number}, м. ${eventData.address.cityName}`,
      cityName: eventData.address.cityName,
      street: eventData.address.street,
      number: eventData.address.number,
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
              onClick={() => setSelected(tab.id)}
              role="button"
              tabIndex={0}>
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles["container__description"]}>
        {selected === "details" && <Description tabs={tabs} />}
        {selected === "location" && <Location tabs={tabs} />}
        {selected === "contacts" && <Contacts tabs={tabs} />}
      </div>
    </div>
  );
}

export default Content;
