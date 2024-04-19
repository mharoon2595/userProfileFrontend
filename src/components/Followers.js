import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollowersData } from "../store/followersSlice";
import swal from "sweetalert";
import styles from "./Followers.module.css";
import FollowersCard from "./FollowersCard";

const Followers = () => {
  const data = useSelector((state) => state.fetchedUserData.data);
  const followersData = useSelector((state) => state.followers.followers);
  const selectedUser = useSelector(
    (state) => state.fetchedUserData.searchedUser
  );
  const dispatch = useDispatch();

  const fetchFollowers = async () => {
    try {
      const fetchData = await fetch(data[selectedUser].followers_url);
      const response = await fetchData.json();
      console.log("RESPONSE--->", response);
      dispatch(addFollowersData({ [selectedUser]: response }));
    } catch (err) {
      swal("Error", err.message, "error");
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  return (
    <div className={styles.followersLayout}>
      {followersData[selectedUser] &&
        followersData[selectedUser].map((item) => (
          <FollowersCard details={item} />
        ))}
    </div>
  );
};

export default Followers;
