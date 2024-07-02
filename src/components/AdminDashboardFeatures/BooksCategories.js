import AdminNavbar from "../Admin/AdminNavbar";
import PageHeading from "../Admin/PageHeading";
import "./BooksCategories.css";
import { useState } from "react";
import { useEffect } from "react";

const BooksCategories = () => {
  const [datas, setData] = useState([]);
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

  return (
    <>
      <AdminNavbar />
      <div className="bookcategories-bg">
        <PageHeading heading="Categories" />

        <div className="admin-table-responsive mt-3">
          <table className="table table-bordered table-striped text-center">
            <thead className="thead-dark ">
              <tr className="table-head">
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
            <tbody className="table-data">
              {datas.map((category) => (
                <tr key={category.categoryId} className="table-data">
                  <td className="table-data">{category.categoryId}</td>
                  <td className="table-data">{category.categoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BooksCategories;
