import styles from "./styles/home.module.scss";

import Filter from "../../components/home/Filter/Filter";
import Slider from "../../components/home/Slider/Slider";
import SearchBar from "../../components/home/SearchBar/SearchBar";
import EventList from "../../components/home/Eventlist/EventList";
import { useSelector } from "react-redux";
import Button from "../../components/Buttons/Button";
import Organizer from "../../components/Home/Organizer/Organizer";

function Home() {
  const { generalEvents, topEventsCity, onlineEvents, closestEvents } =
    useSelector((store) => store.events);

  return (
    <div className={styles["container"]}>
      <Filter />
      <div className={styles["container__slider"]}>
        <Slider />
      </div>
      <h2 className={styles["container__title"]}>
        Знайди <span>подію</span> для себе
      </h2>
      <SearchBar />
      <EventList events={generalEvents} />
      <h2 className={styles["container__title"]}>
        Топа події <span>Київ</span>
      </h2>
      <EventList events={topEventsCity} />
      <Button
        isHollow={true}
        width={31.2}
        height={6.4}
        isCenter={true}>
        Більше подій
      </Button>
      <h2 className={styles["container__title"]}>
        <span>Онлайн</span> події
      </h2>
      <EventList events={onlineEvents} />
      <Button
        isHollow={true}
        width={31.2}
        height={6.4}
        isCenter={true}>
        Більше подій
      </Button>
      <Organizer />
      <h2 className={styles["container__title"]}>
        <span>Найближчі</span> події
      </h2>
      <EventList events={closestEvents} />
      <Button
        isHollow={true}
        width={31.2}
        height={6.4}
        isCenter={true}>
        Більше подій
      </Button>
    </div>
  );
}

export default Home;
