import "./UserLogin.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginRequest = {
      username: username,
      password: password,
    };
    if ((username === "") | (password === "")) {
      setErrorMessage("All fields are required");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/login",
          loginRequest
        );
        if (response.data != null) {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", response.data.role);

          if (response.data.role === "ADMIN") {
            navigate("/admin-dashboard");
          } else {
            setErrorMessage(
              "Role not allowed. Only Admin can login through this page."
            );
          }
        }
      } catch (error) {
        setErrorMessage("Incorrect credentials. Please try again!");
        setUsername("");
        setPassword("");
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
                <h3 className="mb-5">Admin Login</h3>
              </div>
              {errorMessage && (
                <p className="text-danger mt-3">{errorMessage}</p>
              )}
              <div className="form-outline mb-3">
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

              <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  className="form-control form-control-lg"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg text-uppercase "
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>

                <div className="container text-center">
                  <div className="mt-3">
                    <Link
                      className="text-decoration-none text-primary"
                      to="/signup"
                    >
                      Signup
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

export default AdminLogin;
