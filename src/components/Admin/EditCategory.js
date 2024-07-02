import AdminNavbar from "./AdminNavbar";
import "./EditCategory.css";
import PageHeading from "./PageHeading";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SuccessCard from "../SuccessCard";
import FailureCard from "../FailureCard";

const EditCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryid = location.state && location.state.categoryId;
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSeccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8082/category/${categoryid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((category) => {
          setCategoryName(category.categoryName);
          console.log("category : ", category);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [categoryid, token]);

  const handleEditCategory = async (e) => {
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
        if (token) {
          const response = await axios.put(
            `http://localhost:8082/category/${categoryid}`,
            categoryData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("category updated", response.data);
          setCategoryName(categoryName);

          setIsSeccess(true);
          setMessage("Category updated successfuly");
        }
      } catch (error) {
        console.error("error updating category", error);
        setErrorMessage("error ! try again");
        setIsSeccess(false);
        setMessage("Failed to update category");
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
    navigate("/admin-dashboard/manage-category");
  };
  return (
    <>
      <AdminNavbar />
      <div className="editcategory-body-bg">
        <PageHeading heading="Edit Category" />

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
                      <label className="form-label">Category ID</label>
                      <input
                        type="text"
                        required
                        disabled
                        className="form-control categoryid-disabled"
                        value={categoryid}
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
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
                    onClick={handleEditCategory}
                    type="submit"
                    className="btn btn-primary mt-3"
                  >
                    Edit Category
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

export default EditCategory;
