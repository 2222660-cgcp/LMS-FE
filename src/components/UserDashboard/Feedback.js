import "./Feedback.css";
import MainNavbar from "../Admin/MainNavbar";
import UserNavbar from "../User/UserNavbar";
import PageHeading from "../Admin/PageHeading";
import { useState } from "react";
import axios from "axios";
import "./Feedback.css";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const saveFeedback = async (e) => {
    e.preventDefault();
    const feedback = { comment: comment, username: username };
    axios
      .post(`http://localhost:9095/feedback`, feedback, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setComment("");
        console.log(username);
        window.alert("Feedback added succesfully");
        navigate("/user-dashboard");
      })
      .catch((error) => {
        console.error("Error adding feedback");
      });
  };

  return (
    <>
      <MainNavbar />
      <UserNavbar />
      <div className="feedback-bg">
        <PageHeading heading="Feedback Form" />
        <div className="feedback-container mt-5">
          <form className="submit-form" onSubmit={saveFeedback}>
            <div className="form-group feedback-form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                required
                placeholder="Leave your comments or suggestions ..."
                className="form-control feedback-form-control"
                id="comment"
                value={comment}
                onChange={handleInputChange}
                name="comment"
                rows="5"
              />
            </div>
            <button type="submit" className="btn btn-primary feedback-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Feedback;
