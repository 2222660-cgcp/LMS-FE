import React, { useContext, useEffect, useState } from "react";
import PageHeading from "../Admin/PageHeading";
import MainNavbar from "../Admin/MainNavbar";
import UserNavbar from "./UserNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import "./UpdateUser.css";

const UpdateUser = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user?.username || "");
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhoneNumber] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const navigate = useNavigate();
  console.log("indide form" + phone);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setPhoneNumber(user.phone);
      setAddress(user.address);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    const confirmed = window.confirm(
      "Are you sure want to update the details?"
    );
    if (confirmed) {
      e.preventDefault();
      console.log("indide form");
      try {
        const response = await axios.put(
          `http://localhost:8080/update-user/${username}`,
          {
            firstname,
            lastname,
            email,
            phone,
            address,
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("inside form" + username);
        console.log("User updated:", response.data);
        setUser({ username, firstname, lastname, email, phone, address });

        navigate("/user-dashboard/view-user");
        window.alert("Profile updated");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <>
      <MainNavbar />
      <UserNavbar />

      <div className="update-user-form-container">
        <PageHeading heading="Update User" />
        <form className="update-user-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              disabled
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="firstname">Firstname:</label>
            <input
              required
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastname">Lastname:</label>
            <input
              required
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              required
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              required
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
