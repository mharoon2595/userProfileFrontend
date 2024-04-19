import React from "react";
import styles from "./FollowersCard.module.css";
import { useDispatch } from "react-redux";
import { setUsername } from "../store/fetchedUserSlice";
import { useNavigate } from "react-router-dom";

const FollowersCard = ({ details }) => {
  const { login, avatar_url } = details;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("PROP from card--->", details);

  const clickHandler = () => {
    dispatch(setUsername(login));
    navigate("/userProfile");
  };

  return (
    <div className={styles.card} onClick={clickHandler}>
      <img src={avatar_url} className={styles.img} />
      <h3>{login}</h3>
    </div>
  );
};

export default FollowersCard;
