import Button from "../buttons/Button";

import styles from "./styles/setDateComp.module.scss";
import CalendarComp from "../general/CalendarComp";
function SetDateComp({ isHidden }) {
  return (
    <div
      className={`${styles["totalBox"]} ${
        isHidden ? styles["hidden"] : styles["visible"]
      }`}>
      <div className={styles.totalBox__calendar}>
        <CalendarComp />
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

export default SetDateComp;
