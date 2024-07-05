import AdminNavbar from "../layout/AdminNavbar";
import "./ManageBook.css";
import PageHeading from "../layout/PageHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchInput from "../common/SearchInput";

// --------------------------ANAGHA.S.R--------------------------------

const ManageBook = () => {
  const [datas, setData] = useState([]);
  const [bookName, setBookName] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [showFilteredBook, setShowFilteredBook] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    searchBookHandler();
  }, []);

  const searchBookHandler = () => {
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
  };

  const searchBooks = (value) => {
    if (value.trim() === "") {
      setSearchedBook([]);
      setShowAllBooks(true);
      setShowFilteredBook(false);
    } else {
      const filteredBooks = datas.filter((book) =>
        book.bookName.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedBook(filteredBooks);
      setShowAllBooks(false);
      setShowFilteredBook(true);
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

  const handleInputChange = (e) => {
    const { value } = e.target;
    setBookName(value);
    searchBooks(value);
  };

  return (
    <>
      <AdminNavbar />
      <div className="mngbook-body-bg">
        <PageHeading heading="Manage Book" />
        <SearchInput
          placeholder={"Search by Book Name"}
          value={bookName}
          onChange={handleInputChange}
        />

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
            {showFilteredBook &&
              searchedBook.map((book) => (
                <tbody className="table-data">
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
                        className="btn btn-sm btn-spacing"
                        onClick={() => editBookHandler(book.bookId)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm "
                        onClick={() => deleteBookHandler(book.bookId)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}

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
                        className="btn btn-sm btn-spacing"
                        onClick={() => editBookHandler(book.bookId)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm "
                        onClick={() => deleteBookHandler(book.bookId)}
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

export default ManageBook;
