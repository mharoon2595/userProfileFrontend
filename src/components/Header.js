import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>userFetch</div>
      <button>Home</button>
    </div>
  );
};

export default Header;
