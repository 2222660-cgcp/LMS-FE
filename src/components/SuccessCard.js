import React from "react";
import "./SuccessCard.css";

const SuccessCard = ({ message, onClose }) => {
  return (
    <>
      <div className="overlay">
        <div className="card success-card">
          <h3>Success</h3>
          <p>{message}</p>
          <button className="close-button" onClick={onClose}>
            close
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessCard;
