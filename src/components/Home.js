import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  const submitHandler = async () => {
    try {
      const fetchReq = await fetch(
        `http://localhost:8000/api/users/${userInput}`
      );
      if (!fetchReq.ok) {
        throw new Error("User not found");
      }
      const response = await fetchReq.json();
      console.log("response--->", response);
      swal("Alright!", `Here are the details of '${userInput}'`, "success");
    } catch (err) {
      console.log(err);
      swal("Oops!", err.message, "error");
    }
  };

  return (
    <div className={styles.homeLayout}>
      <div className={styles.homeContainer}>
        <h2>Search for a user on Github</h2>
        <input
          className={styles.homeInput}
          placeholder="Enter a username"
          onChange={changeHandler}
        ></input>
        <button className={styles.button} onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
