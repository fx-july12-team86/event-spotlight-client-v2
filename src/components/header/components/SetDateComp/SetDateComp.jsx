import { useDispatch } from "react-redux";

import { updateRangeDate } from "../../../../context/filtersSlice";

import styles from "./styles/setDateComp.module.scss";

import Button from "../../../Buttons/Button";
import CalendarComp from "../../../Calendar/CalendarComp";

function SetDateComp({ isHidden }) {
  const dispatch = useDispatch();

  return (
    <div
      className={`${styles["total-box"]} ${
        isHidden ? styles["hidden"] : styles["visible"]
      }`}>
      <div className={styles["total-box__calendar"]}>
        <CalendarComp selectRange={true} />
      </div>
    </div>
  );
}

export default SetDateComp;
