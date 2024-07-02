import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const signupRequest = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email,
      phone: phone,
      address: address,
      role: "USER",
    };
    console.log(signupRequest);

    if (
      (username === "") |
      (password === "") |
      (confirmPassword === "") |
      (firstname === "") |
      (lastname === "") |
      (email === "") |
      (phone === "") |
      (address === "")
    ) {
      setErrorMessage("All fields are required");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match! Please try again");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/signUp",
          signupRequest
        );
        if (response.data != null) {
          navigate("/login");
        }
      } catch (error) {
        setErrorMessage(
          "Username already exists! Please choose a different username"
        );
        setUsername("");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        setAddress("");
      }
    }
  };

  const handleInputChange = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              <div className="text-center">
                <h3 className="mb-5 ">Signup</h3>
              </div>
              {errorMessage && (
                <p className="text-danger mt-3">{errorMessage}</p>
              )}
              <div className="form-outline mb-1">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={username}
                  className="form-control form-control-lg"
                  placeholder="Username"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              <div className="form-outline mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  value={firstname}
                  className="form-control form-control-lg"
                  placeholder="FirstName"
                  required
                  onChange={(e) => {
                    setFirstname(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  className="form-control form-control-lg"
                  placeholder="LastName"
                  required
                  onChange={(e) => {
                    setLastname(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  value={email}
                  className="form-control form-control-lg"
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  className="form-control form-control-lg"
                  placeholder="Phone Number"
                  required
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  value={address}
                  className="form-control form-control-lg"
                  placeholder="Address"
                  required
                  onChange={(e) => {
                    setAddress(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  className="form-control form-control-lg"
                  placeholder="Create Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg text-uppercase "
                  type="submit"
                  onClick={handleSignup}
                >
                  {" "}
                  Signup
                </button>
                <div className="container text-center">
                  <div className="mt-3">
                    <Link
                      className="text-decoration-none text-primary"
                      to="/login"
                    >
                      User Login
                    </Link>
                  </div>
                </div>

                <div className="container text-center">
                  <div className="mt-2">
                    <Link
                      className="text-decoration-none text-primary"
                      to="/admin-login"
                    >
                      Admin Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
