import Button from "../buttons/Button";
import Calendar from "react-calendar";
import "./styles/Calendar.css";
import styles from "./styles/setDateComp.module.scss";
import { useEffect, useState } from "react";
import { useDataContext } from "../../Context/Context";

function formatToLocalISODateTime(isoString) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function SetDateComp({ isHidden }) {
  const { dispatch } = useDataContext();

  const [selectedDate, setSelectedDate] = useState(
    formatToLocalISODateTime(new Date())
  );

  useEffect(() => {
    dispatch({
      type: "date/new",
      payload: formatToLocalISODateTime(selectedDate),
    });
  }, [selectedDate, dispatch]);

  function handleToday() {
    dispatch({
      type: "date/new",
      payload: formatToLocalISODateTime(new Date()),
    });
  }

  function handleTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    dispatch({
      type: "date/new",
      payload: formatToLocalISODateTime(tomorrow),
    });
  }

  return (
    <div
      className={`${styles.totalBox} ${
        isHidden ? styles.hidden : styles.visible
      }`}>
      <div className={styles.box}>
        <Calendar
          value={selectedDate}
          onChange={(event) => setSelectedDate(formatToLocalISODateTime(event))}
          minDate={new Date()}
          next2Label={null}
          prev2Label={null}
          locale={"uk-UA"}
          // showFixedNumberOfWeeks={true}
          showNeighboringMonth={false}
          nextLabel={<ArrowNext />}
          prevLabel={<ArrowPrev />}
        />
        <ul>
          <li onClick={() => handleToday()}>На сьогодні</li>
          <li onClick={() => handleTomorrow()}>На завтра</li>
          <li>На вихідні</li>
          <li>На тиждень</li>
          <li>На місяць</li>
          <li>На рік</li>
        </ul>
      </div>
      <div className={styles.buttonsBox}>
        <Button
          width={24.8}
          height={6.4}>
          Вибрати
        </Button>
        <Button
          width={24.8}
          height={6.4}
          isHollow={true}>
          Очістити
        </Button>
      </div>
    </div>
  );
}

function ArrowNext() {
  return (
    <img
      src="/icons/header/calendar/arrowNext.svg"
      alt="button next"
    />
  );
}
function ArrowPrev() {
  return (
    <img
      src="/icons/header/calendar/arrowPrev.svg"
      alt="button previous"
    />
  );
}

export default SetDateComp;
