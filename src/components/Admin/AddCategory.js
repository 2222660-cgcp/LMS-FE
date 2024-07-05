import { useState } from "react";
import "./AddCategory.css";
import AdminNavbar from "../layout/AdminNavbar";
import PageHeading from "../layout/PageHeading";
import axios from "axios";
import SuccessCard from "../common/SuccessCard";
import FailureCard from "../common/FailureCard";

// --------------------------ANAGHA.S.R--------------------------------

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSeccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);

  const token = localStorage.getItem("token");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setIsSeccess(null);
    setMessage("");
    setShowCard(false);
    const categoryData = {
      categoryName: categoryName,
    };
    console.log(categoryData);
    if (categoryName === "") {
      setErrorMessage("All fields are required");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8082/category",
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Category added", response.data);
        setCategoryName("");
        setIsSeccess(true);
        setMessage("Category added successfuly");
      } catch (error) {
        console.error("error adding category", error);
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
      <div className="addcategory-body-bg">
        <PageHeading heading="Add Category" />
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
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        required
                        className="form-control "
                        placeholder="Enter Category Name"
                        value={categoryName}
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                  </div>
                  <button
                    onClick={handleAddCategory}
                    type="submit"
                    className="btn btn-primary mt-3"
                  >
                    Add Category
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

export default AddCategory;
