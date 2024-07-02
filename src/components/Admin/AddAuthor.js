import { useState } from "react";
import "./AddAuthor.css";
import AdminNavbar from "./AdminNavbar";
import PageHeading from "./PageHeading";
import axios from "axios";
import SuccessCard from "../SuccessCard";
import FailureCard from "../FailureCard";

const AddAuthor = () => {
  const [authorName, setAuthorName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSeccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);

  const token = localStorage.getItem("token");

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
      setErrorMessage("All fileds are required");
    } else {
      try {
        if (token) {
          const response = await axios.post(
            "http://localhost:8083/author",
            authorData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Author added", response.data);
          setAuthorName("");
          setIsSeccess(true);
          setMessage("Category added successfuly");
        }
      } catch (error) {
        console.error("error adding author", error);
        setErrorMessage("error ! try again");
        setIsSeccess(false);
        setMessage("Failed to add category");
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
  };
  return (
    <>
      <AdminNavbar />
      <div className="addauthor-body-bg">
        <PageHeading heading="Add Author" />
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
                    Add Author
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

export default AddAuthor;
