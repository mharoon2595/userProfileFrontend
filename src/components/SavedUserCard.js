import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { addSavedUsers } from "../store/savedUserSlice";
import Backdrop from "../utils/Backdrop";
import Modal from "../utils/Modal";

const SavedUserCard = ({ details, sortDetails, sortValue, onClick }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const clickHandler = async (arg) => {
    try {
      const deleteUser = await fetch(
        `http://localhost:8000/api/users/delete/${arg}`
      );
      await swal("Alright", "User deleted!", "success");
      const fetchData = await fetch("http://localhost:8000/api/users/all");
      const response = await fetchData.json();
      dispatch(addSavedUsers(response.Users));
      setShowModal(false);
    } catch (err) {
      await swal("Error", "Something weent wrong, please try again", "error");
    }
  };

  const { avatar_url, username } = details;
  return (
    <>
      {showModal && <Backdrop onClick={() => setShowModal(false)} />}
      {showModal && (
        <Modal>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div>Are you sure?</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{ backgroundColor: "green" }}
                onClick={() => clickHandler(username)}
              >
                Yes
              </button>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "5px",
          backgroundColor: "grey",
          borderRadius: "5px",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <img src={avatar_url} style={{ width: "50px", height: "50px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "5px",
          }}
        >
          <p>{username}</p>
          {sortDetails && sortValue !== "none" ? (
            sortValue === "created_at" ? (
              <p>
                {sortValue}: {new Date(details[sortValue]).toString()}
              </p>
            ) : (
              <p>
                {sortValue}: {details[sortValue]}
              </p>
            )
          ) : (
            ""
          )}

          <button
            style={{
              backgroundColor: "red",
              padding: "5px",
              width: "min-content",
            }}
            onClick={(event) => {
              event.stopPropagation();
              setShowModal(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default SavedUserCard;
