import styles from "./styles/calendarComp.module.scss";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatToLocalISODateTime } from "../../Context/dateSlice";
import { updateCurrentDate } from "../../Context/dateSlice";
function CalendarComp() {
  const [selectedDate, setSelectedDate] = useState(
    formatToLocalISODateTime(new Date())
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCurrentDate(formatToLocalISODateTime(selectedDate)));
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

export default CalendarComp;
