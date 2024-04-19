import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const modal = <div className={styles.modal}>{props.children}</div>;

  return ReactDOM.createPortal(modal, document.getElementById("modal"));
};

export default Modal;
