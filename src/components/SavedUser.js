import React, { useEffect, useState } from "react";
import styles from "./SavedUser.module.css";
import swal from "sweetalert";
import SavedUserCard from "./SavedUserCard";

const SavedUser = () => {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("none");
  const [selectedValue1, setSelectedValue1] = useState("none");

  const handleSearchDropdownChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === "none") {
      setData([]);
    }
  };

  const handleSortDropdownChange = (event) => {
    setSelectedValue1(event.target.value);
    if (event.target.value === "none") {
      setData([]);
    }
  };

  useEffect(() => {}, [data]);

  const searchSubmitHandler = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const inputData = form.get("searchText");
    try {
      const fetchData = await fetch(
        `http://localhost:8000/api/users/data/search?${selectedValue}=${inputData}`
      );
      const response = await fetchData.json();
      console.log("RESPONSE FROM SAVED USER--->", response);
      setData(response.data);
    } catch (err) {
      swal("Error", "Something went wrong", "error");
    }
  };

  const sortSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const fetchData = await fetch(
        `http://localhost:8000/api/users/sort/${selectedValue1}`
      );
      const response = await fetchData.json();
      console.log("RESPONSE--->", response);
    } catch (err) {
      swal("Error", "Something went wrong", "error");
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "10px", padding: "10px" }}>
        {" "}
        Saved users in database
      </h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <h3>Search based on:</h3>
          <form
            style={{ display: "flex", gap: "5px", height: "min-content" }}
            onSubmit={searchSubmitHandler}
          >
            <select
              name="dropdown"
              value={selectedValue}
              onChange={handleSearchDropdownChange}
            >
              <option value="none">None</option>
              <option value="name">Name</option>
              <option value="location">Location</option>
              <option value="blog">Blog</option>
              <option value="email">E-mail</option>
              <option value="username">Username</option>
            </select>
            <input
              type="text"
              placeholder="Enter search parameter"
              name="searchText"
              style={{ padding: "5px" }}
              disabled={selectedValue === "none" ? true : false}
            />
            <button
              type="submit"
              disabled={selectedValue === "none" ? true : false}
            >
              Submit
            </button>
          </form>
        </div>
        <div
          style={{
            padding: "1rem",
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <h3>Sort by:</h3>
          <form
            style={{ display: "flex", gap: "5px", height: "min-content" }}
            onSubmit={sortSubmitHandler}
          >
            <select
              name="dropdown"
              value={selectedValue1}
              onChange={handleSortDropdownChange}
            >
              <option value="none">None</option>
              <option value="public_repos">Public repos</option>
              <option value="public_gists">Public gists</option>
              <option value="followers">Followers</option>
              <option value="following">Following</option>
              <option value="created_at">Created at</option>
            </select>
            <button
              type="submit"
              disabled={selectedValue1 === "none" ? true : false}
            >
              Sort
            </button>
          </form>
        </div>
      </div>
      <div className={styles.gridLayout}>
        {data.map((item) => {
          if (item.deleted === false) {
            return <SavedUserCard details={item} />;
          }
        })}
      </div>
    </>
  );
};

export default SavedUser;
