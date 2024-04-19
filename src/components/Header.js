import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>userFetch</div>
      <div className={styles.localDiv}>
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/savedUsers">Saved users</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
