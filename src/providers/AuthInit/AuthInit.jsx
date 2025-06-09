import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./authInit.module.scss";

import { verifyToken } from "../../context/userSlice";

import Spinner from "../../components/Spinner/Spinner";

function AuthInit({ children }) {
  const [isCheking, setIsChecking] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken());
    }
    setIsChecking(false);
  }, []);

  return (
    <>
      {isCheking ? (
        <div className={styles["container"]}>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default AuthInit;
