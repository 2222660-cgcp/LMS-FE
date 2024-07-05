import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Header from "../layout/Header";

// --------------------------ANAGHA.S.R--------------------------------

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = () => {
    setUsernameError("");
    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAddressError("");
    setErrorMessage("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      valid = false;
    }

    if (!firstname.trim()) {
      setFirstnameError("First Name is required");
      valid = false;
    }

    if (!lastname.trim()) {
      setLastnameError("Last Name is required");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      valid = false;
    }

    if (!phone.trim()) {
      setPhoneError("Phone Number is required");
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone Number is invalid");
      valid = false;
    }

    if (!address.trim()) {
      setAddressError("Address is required");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    if (valid) {
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
        setPhone("");
        setAddress("");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container py-3 h-100 signup-container">
        <div className="row d-flex align-items-center h-100">
          <div className="col-md-6">
            <form>
              <div className="text-center">
                <h3 className="mb-3">Signup</h3>
              </div>

              {/* {usernameError && (
                <p className="text-danger mt-3">{usernameError}</p>
              )} */}
              {/* {emailError && <p className="text-danger mt-3">{emailError}</p>} */}
              {/* {phoneError && <p className="text-danger mt-3">{phoneError}</p>} */}
              {/* {passwordError && (
                <p className="text-danger mt-3">{passwordError}</p>
              )} */}
              {/* {confirmPasswordError && (
                <p className="text-danger mt-3">{confirmPasswordError}</p>
              )} */}

              <div className="row mb-3">
                <div className="col-md-6">
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
                  {errorMessage && (
                    <p className="text-danger mt-3">
                      Username already exists. please choose different username
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    value={firstname}
                    className="form-control form-control-lg"
                    placeholder="First Name"
                    required
                    onChange={(e) => {
                      setFirstname(e.target.value);
                      handleInputChange();
                    }}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    value={lastname}
                    className="form-control form-control-lg"
                    placeholder="Last Name"
                    required
                    onChange={(e) => {
                      setLastname(e.target.value);
                      handleInputChange();
                    }}
                  />
                </div>
                <div className="col-md-6">
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
                  {emailError && (
                    <p className="text-danger mt-3">{emailError}</p>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    className="form-control form-control-lg"
                    placeholder="Phone Number"
                    required
                    onChange={(e) => {
                      setPhone(e.target.value);
                      handleInputChange();
                    }}
                  />
                  {phoneError && (
                    <p className="text-danger mt-3">{phoneError}</p>
                  )}
                </div>
                <div className="col-md-6">
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
              </div>

              {/* Password and Confirm Password fields */}
              <div className="row mb-3">
                <div className="col-md-6">
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
                  {passwordError && (
                    <p className="text-danger mt-3">{passwordError}</p>
                  )}
                </div>
                <div className="col-md-6">
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
                  {confirmPasswordError && (
                    <p className="text-danger mt-3">{confirmPasswordError}</p>
                  )}
                </div>
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg text-uppercase"
                  type="submit"
                  onClick={handleSignup}
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;

// const Signup = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phone, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();

// const signupRequest = {
//   username: username,
//   firstname: firstname,
//   lastname: lastname,
//   password: password,
//   email: email,
//   phone: phone,
//   address: address,
//   role: "USER",
// };
// console.log(signupRequest);

//     if (
//       (username === "") |
//       (password === "") |
//       (confirmPassword === "") |
//       (firstname === "") |
//       (lastname === "") |
//       (email === "") |
//       (phone === "") |
//       (address === "")
//     ) {
//       setErrorMessage("All fields are required");
//     } else if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match! Please try again");
//     } else {
// try {
//   const response = await axios.post(
//     "http://localhost:8080/signUp",
//     signupRequest
//   );
//   if (response.data != null) {
//     navigate("/login");
//   }
// } catch (error) {
//   setErrorMessage(
//     "Username already exists! Please choose a different username"
//   );
//   setUsername("");
//   setFirstname("");
//   setLastname("");
//   setEmail("");
//   setPassword("");
//   setConfirmPassword("");
//   setPhoneNumber("");
//   setAddress("");
// }
//     }
//   };

// const handleInputChange = () => {
//   setErrorMessage("");
// };

//   return (
//     <>
// <Header />

//       <div className="container py-3 h-100 signup-container">
//         <div className="row d-flex align-items-center h-100">
//           <div className="col-md-6">
//             <form>
//               <div className="text-center">
//                 <h3 className="mb-3">Signup</h3>
//               </div>
//               {errorMessage && (
//                 <p className="text-danger mt-3">{errorMessage}</p>
//               )}

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Username</label>
//                   <input
//                     type="text"
//                     value={username}
//                     className="form-control form-control-lg"
//                     placeholder="Username"
//                     required
//                     onChange={(e) => {
//                       setUsername(e.target.value);
//                       handleInputChange();
//                     }}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">First Name</label>
//                   <input
//                     type="text"
//                     value={firstname}
//                     className="form-control form-control-lg"
//                     placeholder="FirstName"
//                     required
//                     onChange={(e) => {
//                       setFirstname(e.target.value);
//                       handleInputChange();
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Last Name</label>
//                   <input
//                     type="text"
//                     value={lastname}
//                     className="form-control form-control-lg"
//                     placeholder="LastName"
//                     required
//                     onChange={(e) => {
//                       setLastname(e.target.value);
//                       handleInputChange();
//                     }}
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="text"
//                     value={email}
//                     className="form-control form-control-lg"
//                     placeholder="Email"
//                     required
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       handleInputChange();
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="text"
//                     value={phone}
//                     className="form-control form-control-lg"
//                     placeholder="Phone Number"
//                     required
//                     onChange={(e) => {
//                       setPhoneNumber(e.target.value);
//                       handleInputChange();
//                     }}
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Address</label>
//                   <input
//                     type="text"
//                     value={address}
//                     className="form-control form-control-lg"
//                     placeholder="Address"
//                     required
//                     onChange={(e) => {
//                       setAddress(e.target.value);
//                       handleInputChange();
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     value={password}
//                     className="form-control form-control-lg"
//                     placeholder="Create Password"
//                     required
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       handleInputChange();
//                     }}
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Confirm Password</label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     className="form-control form-control-lg"
//                     placeholder="Confirm Password"
//                     required
//                     onChange={(e) => {
//                       setConfirmPassword(e.target.value);
//                       handleInputChange();
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="d-grid">
//                 <button
//                   className="btn btn-primary btn-lg text-uppercase"
//                   type="submit"
//                   onClick={handleSignup}
//                 >
//                   Signup
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;
