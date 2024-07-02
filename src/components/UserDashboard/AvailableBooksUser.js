import "./AvailableBooksUser.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UserNavbar from "../User/UserNavbar";
import PageHeading from "../Admin/PageHeading";
import MainNavbar from "../Admin/MainNavbar";
import DataNotFound from "../Admin/DataNotFound";

const AvailableBooksUser = () => {
  const [datas, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [bookName, setBookName] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [showFilteredBook, setShowFilteredBook] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/book/available-books", {
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
  }, []);

  const searchBookHandler = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const apiUrl = `http://localhost:8081/book/viewBookSearch/${bookName}`;
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

  const handleReserve = async (bookId) => {
    const confirmed = window.confirm("Are you sure want to reserve this book?");
    if (confirmed) {
      try {
        if (token) {
          console.log(bookId);
          console.log(token);
          const response = await axios.post(
            `http://localhost:9095/books/reserve/${bookId}`,
            null,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log("reserved");
          window.location.reload();
        }
      } catch (error) {
        console.log("error");
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
            {showFilteredBook && (
              <tbody className="table-data">
                <tr className="table-data">
                  <td className="table-data">{searchedBook.bookName}</td>
                  <td className="table-data">{searchedBook.bookNo}</td>
                  <td className="table-data">{searchedBook.authorName}</td>
                  <td className="table-data">{searchedBook.categoryName}</td>

                  <td>
                    {searchedBook.reserved ? (
                      "Reserved"
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleReserve(searchedBook.bookId);
                        }}
                      >
                        Reserve
                      </button>
                    )}
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
                    <td className="table-data">{book.authorName}</td>
                    <td className="table-data">{book.categoryName}</td>

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
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default AvailableBooksUser;
