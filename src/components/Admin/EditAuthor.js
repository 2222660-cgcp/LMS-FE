import AdminNavbar from "./AdminNavbar";
import "./EditAuthor.css";
import PageHeading from "./PageHeading";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SuccessCard from "../SuccessCard";
import FailureCard from "../FailureCard";

const EditAuthor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authorid = location.state && location.state.authorId;
  const [authorName, setAuthorName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSeccess] = useState(null);
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
          console.log("author : ", author);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [authorid, token]);

  const handleAddAuthor = async (e) => {
    e.preventDefault();
    setIsSeccess(null);
    setMessage("");
    setShowCard(false);
    const authorData = {
      authorName: authorName,
    };
    console.log(authorData);
    if (authorName === "") {
      setErrorMessage("All fields are required");
    } else {
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
          setAuthorName(authorName);
          setIsSeccess(true);
          setMessage("Author updated successfully");
        }
      } catch (error) {
        console.error("error adding author", error);
        setErrorMessage("error ! try again");
        setIsSeccess(false);
        setMessage("Failed to add author");
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
                    onClick={handleAddAuthor}
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
