import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, setUsername } from "../store/fetchedUserSlice";
import { addRepo } from "../store/repoSlice";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setUserInput(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(setUsername(userInput));
    navigate("/userProfile");
  };

  return (
    <div className={styles.homeLayout}>
      <div className={styles.homeContainer}>
        <h2>Search for a user on Github</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <input
            className={styles.homeInput}
            placeholder="Enter a username"
            onChange={changeHandler}
            required
          ></input>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
