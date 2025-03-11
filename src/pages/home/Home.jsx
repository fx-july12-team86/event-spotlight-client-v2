import styles from "./styles/home.module.scss";

import Filter from "../../components/home/Filter";
import Slider from "../../components/home/Slider";

function Home() {
  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.container__slider}>
        <Slider />
      </div>
    </div>
  );
}

export default Home;
