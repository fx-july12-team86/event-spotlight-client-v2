import Button from "../../Buttons/Button";

import styles from "./styles/setDateComp.module.scss";
import CalendarComp from "../../Calendar/CalendarComp";
function SetDateComp({ isHidden }) {
  return (
    <div
      className={`${styles["total-box"]} ${
        isHidden ? styles["hidden"] : styles["visible"]
      }`}>
      <div className={styles["total-box__calendar"]}>
        <CalendarComp />
      </div>
      <div className={styles["buttons-box"]}>
        <Button
          width={24.8}
          height={6.4}>
          Вибрати
        </Button>
        <Button
          width={24.8}
          height={6.4}
          isHollow={true}>
          Очистити
        </Button>
      </div>
    </div>
  );
}

export default SetDateComp;
