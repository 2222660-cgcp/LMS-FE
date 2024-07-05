import { useNavigate } from "react-router-dom";
import React from "react";
import "./SessionExpired.css";
import { useSession } from "./SessionContext";

// --------------------------ANAGHA.S.R--------------------------------

const SessionExpired = () => {
  const { setSessionExpired } = useSession();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    setSessionExpired(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("authenticated");
    navigate("/login");
  };

  return (
    <>
      <div className="overlay">
        <div className="card session-expired-modal">
          <h3>Session Expired</h3>
          <p>
            Oops! Your session has expired. Click Login to continue the session.
          </p>
          <button className="close-button" onClick={handleLoginRedirect}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default SessionExpired;
