import { BallTriangle } from "react-loader-spinner";

function Spinner({ width = 100, height = 100 }) {
  return (
    <BallTriangle
      width={width}
      height={height}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}

export default Spinner;
