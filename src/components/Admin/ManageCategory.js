import AdminNavbar from "../layout/AdminNavbar";
import "./ManageCategory.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PageHeading from "../layout/PageHeading";
import { useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";

// --------------------------ANAGHA.S.R--------------------------------

const ManageCategory = () => {
  const [datas, setData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchedCategory, setSearchedCategory] = useState([]);
  const [showAllCategory, setShowAllCategory] = useState(true);
  const [showFilteredCategory, setShowFilteredCategory] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    searchCategoryHandler();
  }, []);

  const searchCategoryHandler = () => {
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
  };

  const searchCategory = (value) => {
    if (value.trim() === "") {
      setSearchedCategory([]);
      setShowAllCategory(true);
      setShowFilteredCategory(false);
    } else {
      const filteredCategory = datas.filter((category) =>
        category.categoryName.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filteredCategory);
      setSearchedCategory(filteredCategory);
      setShowAllCategory(false);
      setShowFilteredCategory(true);
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

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCategoryName(value);
    searchCategory(value);
  };

  return (
    <>
      <AdminNavbar />
      <div className="mngcategory-body-bg">
        <PageHeading heading="Manage Category" />
        <SearchInput
          placeholder={"Search by Category Name"}
          value={categoryName}
          onChange={handleInputChange}
        />

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
                    Actions
                  </th>
                </tr>
              </thead>
            )}
            {showFilteredCategory &&
              searchedCategory.map((category) => (
                <tbody className="table-data">
                  <tr key={category.categoryId} className="table-data">
                    <td className="table-data">{category.categoryName}</td>
                    <td className="table-data ">
                      <button
                        className="btn btn-sm btn-spacing"
                        onClick={() => {
                          editCategoryHandler(category.categoryId);
                        }}
                        title="Edit Category"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm "
                        onClick={() => {
                          deleteCategoryHandler(category.categoryId);
                        }}
                        title="Delete Category"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}

            {showAllCategory && (
              <tbody className="table-data">
                {datas.map((category) => (
                  <tr key={category.categoryId} className="table-data">
                    <td className="table-data">{category.categoryName}</td>
                    <td className="table-data ">
                      <button
                        className="btn btn-sm btn-spacing"
                        onClick={() => {
                          editCategoryHandler(category.categoryId);
                        }}
                        title="Edit Category"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm "
                        onClick={() => {
                          deleteCategoryHandler(category.categoryId);
                        }}
                        title="Delete Category"
                      >
                        <i className="fas fa-trash-alt"></i>
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
