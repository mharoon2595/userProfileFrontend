import React from "react";

const SavedUserCard = ({ details }) => {
  const { avatar_url, username } = details;
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "5px",
        backgroundColor: "grey",
        borderRadius: "5px",
        alignItems: "center",
      }}
    >
      <img src={avatar_url} style={{ width: "50px", height: "50px" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "5px",
          alignItems: "center",
        }}
      >
        <p>{username}</p>
        <button style={{ backgroundColor: "red", padding: "5px" }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SavedUserCard;
