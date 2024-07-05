import SearchInput from "../common/SearchInput";
import AdminNavbar from "../layout/AdminNavbar";
import PageHeading from "../layout/PageHeading";
import "./BooksCategories.css";
import { useState } from "react";
import { useEffect } from "react";

// --------------------------ANAGHA.S.R--------------------------------

const BooksCategories = () => {
  const [datas, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [searchedCategory, setSearchedCategory] = useState([]);
  const [showAllCategory, setShowAllCategory] = useState(true);
  const [showFilteredCategory, setShowFilteredCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");

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

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCategoryName(value);
    searchCategory(value);
  };

  return (
    <>
      <AdminNavbar />
      <div className="bookcategories-bg">
        <PageHeading heading="Categories" />
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
                    Category ID
                  </th>
                  <th
                    className="table-head"
                    style={{ background: "#2c3e50", color: "white" }}
                  >
                    Category Name
                  </th>
                </tr>
              </thead>
            )}

            {showFilteredCategory &&
              searchedCategory.map((category) => (
                <tbody className="table-data">
                  <tr key={category.categoryId} className="table-data">
                    <td className="table-data">{category.categoryId}</td>
                    <td className="table-data">{category.categoryName}</td>
                  </tr>
                </tbody>
              ))}

            {showAllCategory && (
              <tbody className="table-data">
                {datas.map((category) => (
                  <tr key={category.categoryId} className="table-data">
                    <td className="table-data">{category.categoryId}</td>
                    <td className="table-data">{category.categoryName}</td>
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

export default BooksCategories;
