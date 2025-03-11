import styles from "./styles/slider.module.scss";
import { useState } from "react";

import Slide from "./Slide";

const data = [
  {
    imgURL: "/icons/main/slider/halloween.webp",
    category: "Вечірки",
    name: "halloween party для дорослих",
    date: "24 липня 2024",
    time: "19:30",
    location: "Art studio 'Lila', Київ",
    cost: 350,
  },
  {
    imgURL: "/icons/main/slider/soup.webp",
    category: "Майстер-класи",
    name: "halloween party для дорослих",
    date: "24 липня 2024",
    time: "19:30",
    location: "Palace of Sports, Київ",
    cost: 600,
  },
  {
    imgURL: "/icons/main/slider/art-perfomance.webp",
    category: "Виставки",
    name: "Арт-Перформанс",
    date: "5 вересня 2024",
    time: "18:00",
    location: "Mystetskyi Arsenal, Київ",
    cost: 250,
  },
  {
    imgURL: "/icons/main/slider/jazz-cutted.webp",
    category: "Концерти",
    name: "Jazz Night",
    date: "15 жовтня 2024",
    time: "20:00",
    location: "Caribbean Club, Київ",
    cost: 450,
  },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <>
      <button
        className={styles.container__buttonPrev}
        onClick={prevSlide}>
        <svg
          className={`${styles.container__svgSizeNormalise} ${styles.container__buttonPrev__postionArrow}`}>
          <use href="/icons/main/slider/svg/arrows.svg#arrowPrev"></use>
        </svg>
      </button>
      <div className={styles.container}>
        <div className={styles.container__slides}>
          {data.map((item, index) => (
            <Slide
              key={index}
              info={item}
              translate={(index - currentSlide) * 100}
            />
          ))}
        </div>
      </div>
      <button
        className={styles.container__buttonNext}
        onClick={nextSlide}>
        <svg className={`${styles.container__svgSizeNormalise}`}>
          <use href="/icons/main/slider/svg/arrows.svg#arrowNext"></use>
        </svg>
      </button>
    </>
  );
}

export default Slider;
