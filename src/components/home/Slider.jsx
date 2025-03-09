import styles from "./styles/slider.module.scss";

import Slide from "./Slide";

function Slider() {
  const data1 = {
    category: "Вечірки",
    name: "halloween party для дорослих",
    date: "24 липня 2024",
    time: "19:30",
    location: "Art studio 'Lila', Київ",
    cost: 350,
  };

  return (
    <div className={styles.container}>
      <Slide
        imgURL={"/icons/main/slider/halloween.webp"}
        info={data1}
      />
    </div>
  );
}

export default Slider;
