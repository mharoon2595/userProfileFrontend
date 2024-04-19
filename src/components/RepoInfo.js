import React from "react";
import styles from "./RepoInfo.module.css";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const RepoInfo = () => {
  const data = useSelector((state) => state.repoData.selectedRepo);
  const selectedUser = useSelector(
    (state) => state.fetchedUserData.searchedUser
  );

  console.log("data froom selected repo--->", data);

  const { image, title, description } = data;

  return (
    <div className={styles.repoLayout}>
      <div className={styles.repoContainer}>
        <h2 style={{ padding: "5px", marginLeft: "5px" }}>
          From {selectedUser}'s public repo's
        </h2>
        <img src={image} className={styles.img} />
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.description}>
          {description ? description : "No description"}
        </h3>
      </div>
    </div>
  );
};

export default RepoInfo;
