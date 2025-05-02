import { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash";

import Calendar from "react-calendar";
import Button from "../Buttons/Button";

import styles from "./styles/calendarComp.module.scss";
import "./styles/Calendar.css";

import { updateRangeDate } from "../../context/filtersSlice";

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

function CalendarComp() {
  const dispatch = useDispatch();
  const { datesRange } = useSelector((store) => store.filters);

  const [localDateRange, setLocalDateRange] = useState(datesRange);

  useEffect(() => {
    dispatch(updateRangeDate(localDateRange));
  }, [dispatch, localDateRange]);

  useEffect(() => {
    if (localDateRange.length === 0 && datesRange.length !== 0) {
      setLocalDateRange(datesRange);
    }
    if (datesRange.length === 0 && localDateRange.length !== 0) {
      setLocalDateRange([]);
    }
  }, [datesRange]);

  function handleToday() {
    const today = new Date();

    setLocalDateRange([today, today]);
  }

  function handleTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setLocalDateRange([tomorrow, tomorrow]);
  }

  function handleWeekend() {
    const today = new Date();
    const day = today.getDay(); // 0 — неділя, 6 — субота

    // знайти найближчу суботу
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + ((6 - day + 7) % 7));
    const sunday = new Date(saturday);
    sunday.setDate(saturday.getDate() + 1);

    setLocalDateRange([saturday, sunday]);
  }

  function handleWeek() {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 6);

    setLocalDateRange([start, end]);
  }

  function handleMonth() {
    const start = new Date();
    const end = new Date();
    end.setMonth(start.getMonth() + 1);

    setLocalDateRange([start, end]);
  }

  function handleYear() {
    const start = new Date();
    const end = new Date();
    end.setFullYear(start.getFullYear() + 1);

    setLocalDateRange([start, end]);
  }

  function handleClearDateRange() {
    dispatch(updateRangeDate([]));
  }

  return (
    <div className={styles.box}>
      <Calendar
        value={localDateRange}
        onChange={(event) => {
          setLocalDateRange(event);
        }}
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
        locale={"uk-UA"}
        showNeighboringMonth={false}
        selectRange={true}
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
        <li onClick={handleWeekend}>На вихідні</li>
        <li onClick={handleWeek}>На тиждень</li>
        <li onClick={handleMonth}>На місяць</li>
        <li onClick={handleYear}>На рік</li>
      </ul>

      <Button
        width={24.8}
        height={6.4}
        isHollow={true}
        onClick={handleClearDateRange}>
        Очистити
      </Button>
    </div>
  );
}

export default CalendarComp;
