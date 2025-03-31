import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import { isEqual } from "lodash";

import styles from "./styles/calendarComp.module.scss";
import "./styles/Calendar.css";

import {
  formatToLocalISODateTime,
  formatToLocalISODateTimeArray,
  updateSelectedDate,
  updateRangeDate,
} from "../../Context/filtersSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ArrowNext() {
  return (
    <img
      src={`${BASE_URL}/icons/Header/calendar/arrowNext.svg`}
      alt="button next"
    />
  );
}

function ArrowPrev() {
  return (
    <img
      src={`${BASE_URL}/icons/Header/calendar/arrowPrev.svg`}
      alt="button previous"
    />
  );
}

function CalendarComp({ selectRange = false }) {
  const dispatch = useDispatch();
  const { selectedDate, datesRange } = useSelector((store) => store.filters);

  const [localSelectedDate, setLocalSelectedDate] = useState(
    selectedDate || formatToLocalISODateTime(new Date())
  );
  const [localDateRange, setLocalDateRange] = useState(datesRange || []);

  useEffect(() => {
    if (selectRange && localDateRange.length === 2) {
      const formattedLocalRange = formatToLocalISODateTimeArray(localDateRange);
      if (!isEqual(formattedLocalRange, datesRange)) {
        dispatch(updateRangeDate(formattedLocalRange));
      }
    } else {
      const formattedLocal = formatToLocalISODateTime(localSelectedDate);
      if (formattedLocal !== selectedDate) {
        dispatch(updateSelectedDate(formattedLocal));
      }
    }
    console.log(localDateRange);
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
          if (view === "month" && localDateRange.length === 2) {
            if (date >= localDateRange[0] && date <= localDateRange[1]) {
              return styles["highlight"];
            }
          }
          return null;
        }}
      />
      <ul className={styles["dateOptions"]}>
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
