import React from "react";
import styles from "./RepoCard.module.css";
import greenTick from "../assets/greenTick.png";

const RepoCard = ({ details }) => {
  const { name, description } = details;
  return (
    <div className={styles.repoCard}>
      <img src={details.owner.avatar_url} className={styles.img} />
      <div className={styles.title}>
        <div>{name}</div>
        <img src={greenTick} className={styles.tick} />
      </div>
    </div>
  );
};

export default RepoCard;
