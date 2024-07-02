import { useEffect, useState } from "react";
import "./AddBook.css";
import AdminNavbar from "./AdminNavbar";
import PageHeading from "./PageHeading";
import axios from "axios";
import SuccessCard from "../SuccessCard";
import FailureCard from "../FailureCard";
import React from "react";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [bookNo, setBookNo] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSeccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [authorData, setAuthorData] = useState("");
  const [categoryData, setCategoryData] = useState("");

  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (token && categoryId) {
  //     fetch(`http://localhost:8082/category/${categoryId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCategoryData(data);
  //         console.log(categoryData);
  //       })
  //       .catch((error) => {
  //         console.error("Error in category data:", error);
  //         setMessage("Category doesn't exist");
  //       });
  //   }
  // }, [token, categoryId]);

  // useEffect(() => {
  //   if (token && authorId) {
  //     fetch(`http://localhost:8083/author/${authorId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setAuthorData(data);
  //         console.log(authorData);
  //       })
  //       .catch((error) => {
  //         console.error("Error in author data:", error);
  //         setMessage("Author doesn't exist");
  //       });
  //   }
  // }, [token, authorId]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    setIsSeccess(null);
    setMessage("");
    setShowCard(false);

    const addBookInput = {
      bookName: bookName,
      authorId: authorId,
      categoryId: categoryId,
      bookNo: bookNo,
      bookPrice: bookPrice,
    };
    console.log(addBookInput);
    if (
      (bookName === "") |
      (bookNo === "") |
      (bookPrice === "") |
      (authorId === "") |
      (categoryId === "")
    ) {
      setErrorMessage("All fileds are required");
    }
    //  else if (message === "Author doesn't exist") {
    //   setErrorMessage("Author doesn't exist");
    // } else if (message === "Category doesn't exist") {
    //   setErrorMessage("Category doesn't exist");
    // } else {
    try {
      const response = await axios.post(
        "http://localhost:8081/book",
        addBookInput,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book added", response.data);

      setBookName("");
      setBookNo("");
      setBookPrice("");
      setAuthorId("");
      setCategoryId("");
      setIsSeccess(true);
      setMessage("Book added successfuly");
    } catch (error) {
      console.error("error adding book", error);
      setIsSeccess(false);
      setMessage("Failed to add book, author or category doesnt exist");
    } finally {
      setShowCard(true);
    }
    // }
  };

  const handleInputChange = () => {
    setErrorMessage("");
  };

  const handleClose = () => {
    setShowCard(false);
  };

  return (
    <>
      <AdminNavbar />
      <div className="addbook-body-bg">
        <PageHeading heading="Add Book" />
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8 ">
              <div
                className="card border custom-border-color"
                style={{ background: "#e0e0e0", color: "#2c3e50" }}
              >
                <form className="card-body " onSubmit={handleAddBook}>
                  {errorMessage && (
                    <p className="text-danger mt-1">{errorMessage}</p>
                  )}
                  <div className="row mb-3">
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
                  </div>
                  <div className="row mb-3">
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
                    <div className="col-md-6">
                      <label className="form-label">Author ID </label>
                      <input
                        type="number"
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
                  </div>
                  <div className="row mb-3">
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
                  <button type="submit" className="btn btn-primary mt-3">
                    Add Book
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
export default AddBook;
