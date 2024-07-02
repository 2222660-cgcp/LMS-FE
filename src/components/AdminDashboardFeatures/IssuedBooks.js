import "./IssuedBooks.css";
import { useEffect } from "react";
import { useState } from "react";
import AdminNavbar from "../Admin/AdminNavbar";
import PageHeading from "../Admin/PageHeading";

const IssuedBooks = () => {
  const token = localStorage.getItem("token");
  const [datas, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9095/books/view-issued-books", {
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
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <div className="issuedbooks-bg">
        <PageHeading heading="Issued Books" />

        <div className="admin-table-responsive mt-3">
          <table className="table table-bordered table-striped text-center">
            <thead className="thead-dark ">
              <tr className="table-head">
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  User ID{" "}
                </th>
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
                  Issued Date
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Due Date
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Fine
                </th>
              </tr>
            </thead>
            <tbody className="table-data">
              {datas.map((book) => (
                <tr key={book.reservationId} className="table-data">
                  <td className="table-data">{book.username}</td>
                  <td className="table-data">{book.book_Id}</td>
                  <td className="table-data">{book.book_name}</td>
                  <td className="table-data">{book.issuedDate}</td>
                  <td className="table-data">{book.dueDate}</td>
                  <td className="table-data">
                    <span>₹</span>
                    {book.fine}
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

export default IssuedBooks;
