import Button from "../buttons/Button";
import Calendar from "react-calendar";
import "./styles/Calendar.css";
import styles from "./styles/setDateComp.module.scss";
import { useState } from "react";

function SetDateComp({ isHidden }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div
      className={`${styles.totalBox} ${
        isHidden ? styles.hidden : styles.visible
      }`}>
      <div className={styles.box}>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
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
          <li>На сьогодні</li>
          <li>На завтра</li>
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
