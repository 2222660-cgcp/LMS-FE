import "./AvailableBooksUser.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UserNavbar from "../layout/UserNavbar";
import PageHeading from "../layout/PageHeading";
import MainNavbar from "../layout/MainNavbar";

// -------------------IBRAHIM BADSHAH-----------------------------------------

const AvailableBooksUser = () => {
  const [datas, setDatas] = useState([]);
  const token = localStorage.getItem("token");
  const [bookName, setBookName] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [showFilteredBooks, setShowFilteredBooks] = useState(false);

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const fetchAvailableBooks = () => {
    fetch("http://localhost:8081/book/available-books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  };

  const searchBooks = (value) => {
    if (value.trim() === "") {
      setSearchedBooks([]);
      setShowAllBooks(true);
      setShowFilteredBooks(false);
    } else {
      const filteredBooks = datas.filter((book) =>
        book.bookName.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedBooks(filteredBooks);
      setShowAllBooks(false);
      setShowFilteredBooks(true);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setBookName(value);
    searchBooks(value);
  };

  const handleReserve = async (bookId) => {
    const confirmed = window.confirm("Are you sure want to reserve this book?");
    if (confirmed) {
      try {
        const response = await axios.post(
          `http://localhost:9095/books/reserve/${bookId}`,
          null,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("Book reserved successfully.");
        window.location.reload();
        fetchAvailableBooks();
      } catch (error) {
        console.error("Error reserving book:", error);
      }
    }
  };

  return (
    <>
      <MainNavbar />
      <UserNavbar />
      <div className="availablebooks-bg">
        <PageHeading heading="Books" />
        <div className="container mt-2">
          <div className="row mb-3">
            <div className="col-md-6 offset-md-3">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  id="bookName"
                  name="bookName"
                  placeholder="Enter Book Name"
                  value={bookName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            {(showFilteredBooks || showAllBooks) && (
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
                    Author Name
                  </th>
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
            <tbody>
              {showFilteredBooks &&
                searchedBooks.map((book) => (
                  <tr key={book.bookId}>
                    <td>{book.bookName}</td>
                    <td>{book.bookNo}</td>
                    <td>{book.authorName}</td>
                    <td>{book.categoryName}</td>
                    <td>
                      {book.reserved ? (
                        "Reserved"
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleReserve(book.bookId);
                          }}
                        >
                          Reserve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              {showAllBooks &&
                datas.map((book) => (
                  <tr key={book.bookId}>
                    <td>{book.bookName}</td>
                    <td>{book.bookNo}</td>
                    <td>{book.authorName}</td>
                    <td>{book.categoryName}</td>
                    <td>
                      {book.reserved ? (
                        "Reserved"
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleReserve(book.bookId);
                          }}
                        >
                          Reserve
                        </button>
                      )}
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

export default AvailableBooksUser;
