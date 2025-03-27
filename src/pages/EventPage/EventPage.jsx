import styles from "./styles/eventPage.module.scss";

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

function EventPage() {
  return (
    <div className={styles["container"]}>
      <Header />
      <Content />
    </div>
  );
}

export default EventPage;
