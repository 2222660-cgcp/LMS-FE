import AdminNavbar from "../layout/AdminNavbar";
import "./EditAuthor.css";
import PageHeading from "../layout/PageHeading";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SuccessCard from "../common/SuccessCard";
import FailureCard from "../common/FailureCard";

// --------------------------ANAGHA.S.R--------------------------------

const EditAuthor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authorid = location.state && location.state.authorId;
  const [authorName, setAuthorName] = useState("");
  const [initialAuthorName, setInitialAuthorName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8083/author/${authorid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((author) => {
          setAuthorName(author.authorName);
          setInitialAuthorName(author.authorName);
          console.log("author : ", author);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [authorid, token]);

  const handleEditAuthor = async (e) => {
    e.preventDefault();
    setIsSuccess(null);
    setMessage("");
    setShowCard(false);

    if (authorName === "") {
      setErrorMessage("All fields are required");
    } else if (authorName === initialAuthorName) {
      setErrorMessage("No changes detected");
    } else {
      const authorData = {
        authorName: authorName,
      };
      console.log(authorData);
      try {
        if (token) {
          const response = await axios.put(
            `http://localhost:8083/author/${authorid}`,
            authorData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("author updated", response.data);
          setIsSuccess(true);
          setMessage("Author updated successfully");
        }
      } catch (error) {
        console.error("error updating author", error);
        setErrorMessage("Error! Try again");
        setIsSuccess(false);
        setMessage("Failed to update author");
      } finally {
        setShowCard(true);
      }
    }
  };

  const handleInputChange = () => {
    setErrorMessage("");
  };

  const handleClose = () => {
    setShowCard(false);
    navigate("/admin-dashboard/manage-author");
  };

  return (
    <>
      <AdminNavbar />
      <div className="editauthor-body-bg">
        <PageHeading heading="Edit Author" />
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8 ">
              <div
                className="card border custom-border-color"
                style={{ background: "#e0e0e0", color: "#2c3e50" }}
              >
                <form className="card-body ">
                  {errorMessage && (
                    <p className="text-danger mt-1">{errorMessage}</p>
                  )}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Author ID</label>
                      <input
                        type="text"
                        required
                        disabled
                        className="form-control authorid-disabled"
                        value={authorid}
                        onChange={(e) => {
                          setAuthorName(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Author Name</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Enter Author Name"
                        value={authorName}
                        onChange={(e) => {
                          setAuthorName(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                  </div>
                  <button
                    onClick={handleEditAuthor}
                    type="submit"
                    className="btn btn-primary mt-3"
                  >
                    Edit Author
                  </button>
                </form>
                {showCard && isSuccess === true && (
                  <SuccessCard message={message} onClose={handleClose} />
                )}

                {showCard && isSuccess === false && (
                  <FailureCard message={message} onClose={handleClose} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAuthor;
