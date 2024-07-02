import AdminNavbar from "./AdminNavbar";
import "./ManageBook.css";
import PageHeading from "./PageHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataNotFound from "./DataNotFound";

const ManageBook = () => {
  const [datas, setData] = useState([]);
  const [bookName, setBookName] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [showFilteredBook, setShowFilteredBook] = useState(false);
  const navigate = useNavigate();
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
          console.error("Error fetching book data:", error);
        });
    }
  }, [token]);

  const searchBookHandler = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const apiUrl = `http://localhost:8081/book/viewBook/${bookName}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShowFilteredBook(true);
        setShowAllBooks(false);
        const responseData = response.data;
        console.log(responseData);
        setSearchedBook(responseData);
      }
    } catch (error) {
      setShowFilteredBook(false);
      setShowAllBooks(false);
      console.error("Error:", error);
      console.log("Book not found");
    }
  };

  const editBookHandler = (bookId) => {
    navigate("/admin-dashboard/manage-book/edit-book", { state: { bookId } });
  };

  const deleteBookHandler = async (bookId) => {
    const confirmed = window.confirm("Are you sure want to delete this book?");
    if (confirmed) {
      try {
        if (token) {
          const response = await axios.delete(
            `http://localhost:8081/book/${bookId}`,
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
        console.error("error adding book", error);
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="mngbook-body-bg">
        <PageHeading heading="Manage Book" />
        <div className="container mt-2">
          <div className="row mb-3">
            <div className="col-md-6 offset-md-3 ">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  id="bookName"
                  name="bookName"
                  placeholder="Enter Book Name"
                  required
                  onChange={(e) => setBookName(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    onClick={searchBookHandler}
                  >
                    Search{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!showFilteredBook && !showAllBooks && <DataNotFound data="Book" />}
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            {(showFilteredBook || showAllBooks) && (
              <thead className="thead-dark ">
                <tr className="table-head">
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
                    Price
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
            {showFilteredBook && (
              <tbody className="table-data">
                <tr className="table-data">
                  <td className="table-data">{searchedBook.bookName}</td>
                  <td className="table-data">{searchedBook.bookNo}</td>
                  <td className="table-data">{searchedBook.authorId}</td>
                  <td className="table-data">
                    <span>₹</span>
                    {searchedBook.bookPrice}
                  </td>
                  <td className="table-data ">
                    <button
                      className="btn btn-warning btn-sm btn-spacing"
                      onClick={() => editBookHandler(searchedBook.bookId)}
                    >
                      <i className="fas fa-edit"></i>Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm "
                      onClick={() => deleteBookHandler(searchedBook.bookId)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            )}

            {showAllBooks && (
              <tbody className="table-data">
                {datas.map((book) => (
                  <tr key={book.bookId} className="table-data">
                    <td className="table-data">{book.bookName}</td>
                    <td className="table-data">{book.bookNo}</td>
                    <td className="table-data">{book.authorId}</td>
                    <td className="table-data">
                      <span>₹</span>
                      {book.bookPrice}
                    </td>
                    <td className="table-data ">
                      <button
                        className="btn btn-warning btn-sm btn-spacing"
                        onClick={() => editBookHandler(book.bookId)}
                      >
                        <i className="fas fa-edit"></i>Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm "
                        onClick={() => deleteBookHandler(book.bookId)}
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

export default ManageBook;
