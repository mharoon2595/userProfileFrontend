import React from "react";
import styles from "./Backdrop.module.css";
import ReactDOM from "react-dom";

const Backdrop = ({ onClick }) => {
  const backdrop = (
    <div className={styles.backdrop} onClick={onClick}>
      Backdrop
    </div>
  );

  return ReactDOM.createPortal(backdrop, document.getElementById("backdrop"));
};

export default Backdrop;
