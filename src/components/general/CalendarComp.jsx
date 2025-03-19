import styles from "./styles/calendarComp.module.scss";
import "./styles/Calendar.css";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowNextIcon from "/public/icons/header/calendar/arrowNext.svg?react";

import {
  formatToLocalISODateTime,
  formatToLocalISODateTimeArray,
  updateSelectedDate,
  updateRangeDate,
} from "../../Context/dateSlice";

function ArrowNext() {
  return <ArrowNextIcon className="" />;
}

function ArrowPrev() {
  return (
    <img
      src="/icons/header/calendar/arrowPrev.svg"
      alt="button previous"
    />
  );
}

function CalendarComp({ selectRange = false }) {
  const dispatch = useDispatch();
  const { selectedDate, datesRange } = useSelector((store) => store.date);

  const [localSelectedDate, setLocalSelectedDate] = useState(
    selectedDate || formatToLocalISODateTime(new Date())
  );
  const [localDateRange, setLocalDateRange] = useState(datesRange || []);

  useEffect(() => {
    // Синхронизация локального состояния с Redux
    if (selectRange && localDateRange !== datesRange) {
      dispatch(updateRangeDate(formatToLocalISODateTimeArray(localDateRange)));
    } else if (!selectRange && localSelectedDate !== selectedDate) {
      dispatch(updateSelectedDate(formatToLocalISODateTime(localSelectedDate)));
    }
  }, [
    localSelectedDate,
    localDateRange,
    dispatch,
    selectedDate,
    datesRange,
    selectRange,
  ]);

  function handleToday() {
    const today = new Date();
    setLocalSelectedDate(today);
  }

  function handleTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setLocalSelectedDate(tomorrow);
  }

  return (
    <div className={styles.box}>
      <Calendar
        value={selectRange ? localDateRange : localSelectedDate}
        onChange={(event) => {
          if (selectRange) {
            setLocalDateRange(event);
          } else {
            setLocalSelectedDate(event);
          }
        }}
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
        locale={"uk-UA"}
        showNeighboringMonth={false}
        selectRange={selectRange}
        nextLabel={<ArrowNext />}
        prevLabel={<ArrowPrev />}
        tileClassName={({ date, view }) => {
          if (view === "month" && selectRange && localDateRange.length === 2) {
            if (date >= localDateRange[0] && date <= localDateRange[1]) {
              return styles.highlight; // Используем SCSS-модуль
            }
          }
          return null;
        }}
      />
      <ul className={styles.dateOptions}>
        <li onClick={handleToday}>На сьогодні</li>
        <li onClick={handleTomorrow}>На завтра</li>
        <li>На вихідні</li>
        <li>На тиждень</li>
        <li>На місяць</li>
        <li>На рік</li>
      </ul>
    </div>
  );
}

export default CalendarComp;
