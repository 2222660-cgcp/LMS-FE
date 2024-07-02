import React from "react";
import "./FailureCard.css";

const FailureCard = ({ message, onClose }) => {
  return (
    <>
      <div className="overlay">
        <div className="card failure-card">
          <h3>Failure</h3>
          <p>{message}</p>
          <button className="close-button" onClick={onClose}>
            close
          </button>
        </div>
      </div>
    </>
  );
};

export default FailureCard;
