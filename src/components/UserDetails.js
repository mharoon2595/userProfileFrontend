import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserDetails.module.css";
import swal from "sweetalert";
import { addRepo } from "../store/repoSlice";
import RepoCard from "./RepoCard";
import { Link, useNavigate } from "react-router-dom";
import { addUser, editUserDetails } from "../store/fetchedUserSlice";
import Backdrop from "../utils/Backdrop";
import Modal from "../utils/Modal";
import LoadingSpinner from "../utils/LoadingSpinner";

const UserDetails = () => {
  const data = useSelector((state) => state.fetchedUserData.data);
  const repoData = useSelector((state) => state.repoData.repoCache);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const selectedUser = useSelector(
    (state) => state.fetchedUserData.searchedUser
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log(form.get("changeInfo"));
    const newDetails = form.get("changeInfo");
    dispatch(
      editUserDetails({
        outerKey: selectedUser,
        innerKey: editValue,
        value: newDetails,
      })
    );
    setEdit(false);
    try {
      const changeData = await fetch(
        `http://localhost:8000/api/users/data/${selectedUser}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + process.env.REACT_APP_GITHUB_KEY,
          },
          body: JSON.stringify({ [editValue]: newDetails }),
        }
      );
      if (!changeData.ok) {
        const response = await changeData.json();
        throw new Error(response.message);
      }

      await swal("Alright!", editValue + " updated!", "success");
    } catch (err) {
      await swal("Oops", err.message, "error");
    }
  };

  const editingTrue = (val) => {
    setEdit(true);
    setEditValue(val);
  };

  const editingFalse = () => {
    setEdit(false);
    setEditValue("");
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        if (!data[selectedUser]) {
          return;
        }
        const fetchData = await fetch(
          data[selectedUser].repos_url + "?per_page=100",
          {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + process.env.REACT_APP_GITHUB_KEY,
            },
          }
        );
        const response = await fetchData.json();
        console.log("response from userDetails--->", response);
        dispatch(addRepo({ [selectedUser]: response }));
        setIsLoading(false);
      } catch (err) {
        await swal("Uh-oh!", err.message, "error");
        setIsLoading(false);
        navigate("/");
      }
    };
    if (!repoData[selectedUser] && selectedUser !== "") {
      fetchRepos();
    }
  }, [data, selectedUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchReq = await fetch(
          `http://localhost:8000/api/users/${selectedUser}`
        );
        if (!fetchReq.ok) {
          throw new Error("User not found");
        }
        const response = await fetchReq.json();
        console.log("response--->", response);
        await swal(
          "Alright!",
          `Here are the details of '${selectedUser}'`,
          "success"
        );
        dispatch(addUser({ [selectedUser]: response.user }));
      } catch (err) {
        await swal("Error", err.message, "error");
        setIsLoading(false);
        navigate("/");
      }
    };
    if (!data[selectedUser] && selectedUser !== "") {
      fetchData();
    }
  }, [data, selectedUser]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {edit && <Backdrop onClick={editingFalse} />}
      {edit && (
        <Modal>
          <div style={{ textAlign: "center", margin: "10px" }}>
            Editing "{editValue}"{" "}
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
            onSubmit={submitHandler}
          >
            {editValue === "Bio" && <textarea name="changeInfo" />}

            {editValue === "E-mail" && (
              <input type="email" name="changeInfo" style={{ width: "50%" }} />
            )}

            {editValue !== "Bio" && editValue !== "E-mail" && (
              <input type="text" name="changeInfo" style={{ width: "50%" }} />
            )}

            <button
              type="submit"
              style={{
                width: "25%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Confirm changes
            </button>
          </form>
        </Modal>
      )}
      {data[selectedUser] && (
        <div className={styles.userLayout}>
          <img src={data[selectedUser].avatar_url} className={styles.img} />
          <h2>{selectedUser}</h2>
          <div className={styles.details}>
            <div className={styles.bio}>
              <div>Location: {data[selectedUser].location}</div>
              <div
                className={styles.edit}
                onClick={() => editingTrue("location")}
              >
                Edit
              </div>
            </div>
            <div className={styles.bio}>
              <div>E-mail: {data[selectedUser].email}</div>
              <div className={styles.edit} onClick={() => editingTrue("email")}>
                Edit
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.bio}>
              <div>Bio: {data[selectedUser].bio}</div>
              <div className={styles.edit} onClick={() => editingTrue("bio")}>
                Edit
              </div>
            </div>

            <div className={styles.bio}>
              <div>Company: {data[selectedUser].company}</div>
              <div
                className={styles.edit}
                onClick={() => editingTrue("company")}
              >
                Edit
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <div style={{ width: "20rem" }}>
              Followers: {data[selectedUser].followers}
            </div>

            <div style={{ width: "20rem" }}>
              Friends: {data[selectedUser].friends}
            </div>
          </div>
          <div className={styles.details}>
            <div style={{ width: "20rem" }}>
              Public repos: {data[selectedUser].public_repos}
            </div>

            <div style={{ width: "20rem" }}>
              Blog: {data[selectedUser].blog}
            </div>
          </div>

          <button className={styles.button}>
            <Link to="/userProfile/followers">Followers list</Link>
          </button>
        </div>
      )}
      <div className={styles.userLayout}>
        <h2>
          Repos:
          {repoData[selectedUser] && repoData[selectedUser].length === 0
            ? " " + "Nil"
            : ""}
        </h2>
        <div className={styles.repoLayout}>
          {repoData[selectedUser] &&
            repoData[selectedUser].map((item) => <RepoCard details={item} />)}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
