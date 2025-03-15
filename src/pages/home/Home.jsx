import styles from "./styles/home.module.scss";

import Filter from "../../components/home/Filter";
import Slider from "../../components/home/Slider";
import SearchBar from "../../components/home/SearchBar";

function Home() {
  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.container__slider}>
        <Slider />
      </div>
      <h2>
        Знайди <span>подію</span> для себе
      </h2>
      <SearchBar />
    </div>
  );
}

export default Home;
