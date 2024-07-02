import "./AvailableBooks.css";
import { useState } from "react";
import { useEffect } from "react";
import AdminNavbar from "../Admin/AdminNavbar";
import PageHeading from "../Admin/PageHeading";

const AvailableBooks = () => {
  const [datas, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8081/book", {
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
          console.error("Error fetching customer data:", error);
        });
    }
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <div className="availablebooks-bg">
        <PageHeading heading="Books" />

        <div className="admin-table-responsive mt-3">
          <table className="table table-bordered table-striped text-center">
            <thead className="thead-dark ">
              <tr className="table-head">
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Book ID
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Book Name
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Book No
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Author ID
                </th>
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
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="table-data">
              {datas.map((book) => (
                <tr key={book.bookId} className="table-data">
                  <td className="table-data">{book.bookId}</td>
                  <td className="table-data">{book.bookName}</td>
                  <td className="table-data">{book.bookNo}</td>
                  <td className="table-data">{book.authorId}</td>
                  <td className="table-data">{book.categoryId}</td>
                  <td className="table-data">
                    <span>₹</span>
                    {book.bookPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AvailableBooks;
