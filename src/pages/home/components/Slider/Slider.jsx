import { useState } from "react";

import styles from "./styles/slider.module.scss";

import Slide from "./Slide";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const data = [
  {
    imgURL: `${BASE_URL}/icons/Home/slider/halloween.webp`,
    category: "Вечірки",
    name: "halloween party для дорослих",
    date: "24 липня 2025",
    time: "19:30",
    location: "Art studio 'Lila', Київ",
    price: 350,
  },
  {
    imgURL: `${BASE_URL}/icons/Home/slider/soup.webp`,
    category: "Майстер-класи",
    name: "halloween party для дорослих",
    date: "24 липня 2025",
    time: "19:30",
    location: "Palace of Sports, Київ",
    price: 600,
  },
  {
    imgURL: `${BASE_URL}/icons/Home/slider/art-perfomance.webp`,
    category: "Виставки",
    name: "Арт-Перформанс",
    date: "5 вересня 2025",
    time: "18:00",
    location: "Mystetskyi Arsenal, Київ",
    price: 250,
  },
  {
    imgURL: `${BASE_URL}/icons/Home/slider/jazz-cutted.webp`,
    category: "Концерти",
    name: "Jazz Night",
    date: "15 жовтня 2025",
    time: "20:00",
    location: "Caribbean Club, Київ",
    price: 450,
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
        className={styles["container__buttonPrev"]}
        onClick={prevSlide}>
        <svg
          className={`${styles["svgSizeNormalize"]} ${styles["container__buttonPrev__postionArrow"]}`}>
          <use href={`${BASE_URL}/icons/General//arrows.svg#arrowPrev`}></use>
        </svg>
      </button>
      <div className={styles["container"]}>
        <div className={styles["container__slides"]}>
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
        className={styles["container__buttonNext"]}
        onClick={nextSlide}>
        <svg className={`${styles["svgSizeNormalize"]}`}>
          <use href={`${BASE_URL}/icons/General/arrows.svg#arrowNext`}></use>
        </svg>
      </button>
    </>
  );
}

export default Slider;
