import { useState } from "react";
import "./EditBook.css";
import PageHeading from "../layout/PageHeading";
import AdminNavbar from "../layout/AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SuccessCard from "../common/SuccessCard";
import FailureCard from "../common/FailureCard";

// --------------------------ANAGHA.S.R--------------------------------

const EditBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookid = location.state && location.state.bookId;
  const [bookName, setBookName] = useState("");
  const [bookNo, setBookNo] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [initialBookDetails, setInitialBookDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [authorData, setAuthorData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && categoryId) {
      fetch(`http://localhost:8082/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())

        .then((data) => {
          setCategoryData(data);

          console.log(categoryData);
        })

        .catch((error) => {
          console.error("Error in category data:", error);

          setMessage("Category doesn't exist");
        });
    }
  }, [token, categoryId]);

  useEffect(() => {
    if (token && authorId) {
      fetch(`http://localhost:8083/author/${authorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())

        .then((data) => {
          setAuthorData(data);

          console.log(authorData);
        })

        .catch((error) => {
          console.error("Error in author data:", error);

          setMessage("Author doesn't exist");
        });
    }
  }, [token, authorId]);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8081/book/${bookid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())

        .then((book) => {
          setBookName(book.bookName);
          setAuthorId(book.authorId);
          setBookNo(book.bookNo);
          setCategoryId(book.categoryId);
          setBookPrice(book.bookPrice);
          setInitialBookDetails(book);
          console.log("book : ", book);
        })

        .catch((error) => {
          console.error("Error fetching book data:", error);
        });
    }
  }, [bookid, token]);

  const handleEditBook = async (e) => {
    e.preventDefault();
    setIsSuccess(null);
    setMessage("");
    setShowCard(false);

    if (
      bookName === "" ||
      bookNo === "" ||
      bookPrice === "" ||
      authorId === "" ||
      categoryId === ""
    ) {
      setErrorMessage("All fields are required");
    } else if (
      bookName === initialBookDetails.bookName &&
      bookNo === initialBookDetails.bookNo &&
      bookPrice === initialBookDetails.bookPrice &&
      authorId === initialBookDetails.authorId &&
      categoryId === initialBookDetails.categoryId
    ) {
      setErrorMessage("No changes detected");
    } else if (message === "Author doesn't exist") {
      setErrorMessage("Author doesn't exist");
    } else if (message === "Category doesn't exist") {
      setErrorMessage("Category doesn't exist");
    } else {
      const editBookInput = {
        bookName: bookName,
        bookNo: bookNo,
        bookPrice: bookPrice,
        authorId: authorId,
        categoryId: categoryId,
      };
      console.log("new book ", editBookInput);
      try {
        if (token) {
          const response = await axios.put(
            `http://localhost:8081/book/${bookid}`,
            editBookInput,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Book updated", response.data);
          setIsSuccess(true);
          setMessage("Book updated successfully");
        }
      } catch (error) {
        console.error("error updating book", error);
        setErrorMessage("Error! Try again");
        setIsSuccess(false);
        setMessage("Failed to update book");
      } finally {
        setShowCard(true);
      }
    }
  };

  const handleInputChange = () => {
    setErrorMessage("");
  };

  const handleClose = () => {
    setShowCard(false);
    navigate("/admin-dashboard/manage-book");
  };

  return (
    <>
      <AdminNavbar />
      <div className="editbook-body-bg">
        <PageHeading heading="Edit Book" />

        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8 ">
              <div
                className="card border custom-border-color"
                style={{ background: "#e0e0e0", color: "#2c3e50" }}
              >
                <form className="card-body ">
                  {errorMessage && (
                    <p className="text-danger mt-1">{errorMessage}</p>
                  )}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Book ID</label>
                      <input
                        type="text"
                        required
                        className="form-control bookid-disabled"
                        disabled
                        value={bookid}
                        onChange={(e) => {
                          setBookName(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Book Name</label>
                      <input
                        type="text"
                        required
                        className="form-control "
                        placeholder="Enter Book Name"
                        value={bookName}
                        onChange={(e) => {
                          setBookName(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Book No</label>
                      <input
                        type="number"
                        required
                        className="form-control "
                        placeholder="Enter Book No"
                        value={bookNo}
                        onChange={(e) => {
                          setBookNo(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category ID</label>
                      <input
                        type="number"
                        required
                        className="form-control "
                        placeholder="Enter Category ID"
                        value={categoryId}
                        onChange={(e) => {
                          setCategoryId(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Author ID </label>
                      <input
                        type="text"
                        required
                        className="form-control "
                        placeholder="Enter Author ID "
                        value={authorId}
                        onChange={(e) => {
                          setAuthorId(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Book Price</label>
                      <input
                        type="number"
                        required
                        className="form-control"
                        placeholder="Enter Book Price "
                        value={bookPrice}
                        onChange={(e) => {
                          setBookPrice(e.target.value);
                          handleInputChange();
                        }}
                      ></input>
                    </div>
                  </div>
                  <button
                    onClick={handleEditBook}
                    type="submit"
                    className="btn btn-primary mt-3"
                  >
                    Edit Book
                  </button>
                </form>
                {showCard && isSuccess === true && (
                  <SuccessCard message={message} onClose={handleClose} />
                )}

                {showCard && isSuccess === false && (
                  <FailureCard message={message} onClose={handleClose} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBook;
