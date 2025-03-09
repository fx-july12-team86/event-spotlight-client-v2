import styles from "./styles/slide.module.scss";

function Slide({ imgURL, info }) {
  const { category, name, date, time, location, cost } = info;
  return (
    <div className={styles.container}>
      <img
        src={imgURL}
        alt={name}
      />
      <div>
        <span>{category}</span>
        <p>{name}</p>
        <div>
          <span>{date}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export default Slide;
