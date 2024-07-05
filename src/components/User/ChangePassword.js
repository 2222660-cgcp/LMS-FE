import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainNavbar from "../layout/MainNavbar";
import UserNavbar from "../layout/UserNavbar";
import PageHeading from "../layout/PageHeading";
import UserContext from "./UserContext";
import "./ChangePassword.css";

// -------------------IBRAHIM BADSHAH-----------------------------------------

const ChangePassword = () => {
  const { user } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword === "" || confirmPassword === "") {
      setErrorMessage("All fields are required");
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match! Please try again");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8080/change-password/${user.username}`,
          { newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Password updated:", response.data);
        navigate("/user-dashboard/view-user");
        window.alert("Password updated successfully");
      } catch (error) {
        console.error("Error changing password:", error);
        setErrorMessage("Error changing password");
      }
    }
  };

  const handleInputChange = () => {
    setErrorMessage("");
  };

  return (
    <>
      <MainNavbar />
      <UserNavbar />
      <PageHeading heading="Change Password" />
      <form className="change-password-form" onSubmit={handleChangePassword}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={user.username} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary mt-3">
          Change Password
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
