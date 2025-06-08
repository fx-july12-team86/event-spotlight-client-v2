import styles from "./ApproveDeleteEvent.module.scss";

import Button from "../../../../components/Buttons/Button";

function ApproveDeleteEvent({ onSetApproveDeleteEvent, handleDeleteEvent }) {
  return (
    <div className={styles["container"]}>
      <div className={styles["container__modal"]}>
        <header className={styles["container__modal--header"]}>
          <h2>Видалити івент?</h2>
          <button onClick={() => onSetApproveDeleteEvent(false)}></button>
        </header>
        <div className={styles["container__modal--btns"]}>
          <Button
            width={15}
            height={5}
            isHollow={true}
            onClick={() => onSetApproveDeleteEvent(false)}>
            Не видаляти
          </Button>
          <button
            className={styles["container__modal--delete-btn"]}
            onClick={handleDeleteEvent}>
            Видалити івент
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApproveDeleteEvent;
