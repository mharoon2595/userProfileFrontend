import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollowersData } from "../store/followersSlice";
import swal from "sweetalert";
import styles from "./Followers.module.css";
import FollowersCard from "./FollowersCard";
import LoadingSpinner from "../utils/LoadingSpinner";

const Followers = () => {
  const data = useSelector((state) => state.fetchedUserData.data);
  const followersData = useSelector((state) => state.followers.followers);
  const [isLoading, setIsLoading] = useState(true);
  const selectedUser = useSelector(
    (state) => state.fetchedUserData.searchedUser
  );
  const dispatch = useDispatch();

  const fetchFollowers = async () => {
    try {
      const fetchData = await fetch(
        data[selectedUser].followers_url + "?per_page=100",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + process.env.REACT_APP_GITHUB_KEY,
          },
        }
      );
      const response = await fetchData.json();
      console.log("RESPONSE--->", response);
      dispatch(addFollowersData({ [selectedUser]: response }));
      setIsLoading(false);
    } catch (err) {
      await swal("Error", err.message, "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!followersData[selectedUser]) {
      fetchFollowers();
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <h1 style={{ textAlign: "center" }}>Followers of '{selectedUser}'</h1>
      {followersData[selectedUser] &&
        followersData[selectedUser].length === 0 && (
          <h3 style={{ textAlign: "center" }}>
            No followers for '{selectedUser}' yet!
          </h3>
        )}
      <div className={styles.followersLayout}>
        {followersData[selectedUser] &&
          followersData[selectedUser].map((item) => (
            <FollowersCard details={item} />
          ))}
      </div>
    </>
  );
};

export default Followers;
