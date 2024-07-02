import AdminNavbar from "./AdminNavbar";
import "./ManageCategory.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PageHeading from "./PageHeading";
import { useNavigate } from "react-router-dom";
import DataNotFound from "./DataNotFound";

const ManageCategory = () => {
  const [datas, setData] = useState([]);
  const [categoryName, setCateoryName] = useState("");
  const [searchedCategory, srtSearchedCategory] = useState([]);
  const [showAllCategory, setShowAllCategory] = useState(true);
  const [showFilteredCategory, setShowFilteredCategory] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8082/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token]);

  const searchCategoryHandler = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `http://localhost:8082/category/view-category/${categoryName}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowFilteredCategory(true);
      setShowAllCategory(false);
      const responseData = response.data;
      console.log(responseData);
      srtSearchedCategory(responseData);
    } catch (error) {
      setShowFilteredCategory(false);
      setShowAllCategory(false);
      console.error("Error:", error);
      console.log("Category not found");
    }
  };

  const editCategoryHandler = (categoryId) => {
    console.log("edit.....", categoryId);
    navigate("/admin-dashboard/manage-category/edit-category", {
      state: { categoryId },
    });
  };

  const deleteCategoryHandler = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure want to delete this category?"
    );
    if (confirmed) {
      try {
        if (token) {
          const response = await axios.delete(
            `http://localhost:8082/category/${categoryId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("delete ", response);
          window.location.reload();
        }
      } catch (error) {
        console.error("error deleting category", error);
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="mngcategory-body-bg">
        <PageHeading heading="Manage Category" />
        <div className="container mt-2">
          <div className="row mb-3">
            <div className="col-md-6 offset-md-3 ">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  name="categoryName"
                  placeholder="Enter Category Name"
                  required
                  onChange={(e) => setCateoryName(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    onClick={searchCategoryHandler}
                  >
                    Search{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!showFilteredCategory && !showAllCategory && (
          <DataNotFound data="Category" />
        )}

        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            {(showFilteredCategory || showAllCategory) && (
              <thead className="thead-dark">
                <tr>
                  <th
                    className="table-head"
                    style={{ background: "#2c3e50", color: "white" }}
                  >
                    Category Name
                  </th>
                  <th
                    className="table-head"
                    style={{ background: "#2c3e50", color: "white" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
            )}
            {showFilteredCategory && (
              <tbody className="table-data">
                <tr className="table-data">
                  <td className="table-data">
                    {searchedCategory.categoryName}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm btn-spacing"
                      onClick={() => {
                        editCategoryHandler(searchedCategory.categoryId);
                      }}
                    >
                      <i className="fas fa-edit"></i>Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm "
                      onClick={() => {
                        deleteCategoryHandler(searchedCategory.categoryId);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            )}

            {showAllCategory && (
              <tbody className="table-data">
                {datas.map((category) => (
                  <tr key={category.categoryId} className="table-data">
                    <td className="table-data">{category.categoryName}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm btn-spacing"
                        onClick={() => {
                          editCategoryHandler(category.categoryId);
                        }}
                      >
                        <i className="fas fa-edit"></i>Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm "
                        onClick={() => {
                          deleteCategoryHandler(category.categoryId);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageCategory;
