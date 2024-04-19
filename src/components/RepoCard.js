import React from "react";
import styles from "./RepoCard.module.css";
import greenTick from "../assets/greenTick.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addInfo } from "../store/repoSlice";

const RepoCard = ({ details }) => {
  const { name, description } = details;
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(
      addInfo({
        image: details.owner.avatar_url,
        title: name,
        description: description,
      })
    );
  };

  return (
    <div onClick={clickHandler}>
      <Link to="/userProfile/repoInfo">
        <div className={styles.repoCard}>
          <img src={details.owner.avatar_url} className={styles.img} />
          <div className={styles.title}>
            <div>{name}</div>
            <img src={greenTick} className={styles.tick} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RepoCard;
