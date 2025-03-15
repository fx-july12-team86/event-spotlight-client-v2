import Button from "../buttons/Button";
import "./styles/Calendar.css";
import styles from "./styles/setDateComp.module.scss";
import CalendarComp from "./CalendarComp";
import { formatToLocalISODateTime } from "../../Context/dateSlice";

function SetDateComp({ isHidden }) {
  return (
    <div
      className={`${styles.totalBox} ${
        isHidden ? styles.hidden : styles.visible
      }`}>
      <CalendarComp />
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

export default SetDateComp;
