import AdminNavbar from "../layout/AdminNavbar";
import "./IssueBook.css";
import { useState } from "react";
import PageHeading from "../layout/PageHeading";
import axios from "axios";

// --------------------------ANAGHA.S.R--------------------------------

const IssueBook = () => {
  const [bookName, setBookName] = useState("");
  const [bookNo, setBookNo] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [userId, setUserId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleIssueBook = async (e) => {
    e.preventDefault();
    const issueBookData = {
      bookName: bookName,
      bookNo: bookNo,
      authorId: authorId,
      userId: userId,
      issueDate: issueDate,
    };
    console.log(issueBookData);
    if (
      (bookName === "") |
      (bookNo === "") |
      (authorId === "") |
      (userId === "") |
      (issueDate === "")
    ) {
      setErrorMessage("All fields are required");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8085/issued-books",
          issueBookData
        );
        console.log("Book issued", response.data);

        setBookName("");
        setBookNo("");
        setUserId("");
        setAuthorId("");
        setIssueDate("");
      } catch (error) {
        console.error("error issuing book", error);
        setErrorMessage("error ! try again");
      }
    }
  };
  const handleInputChange = () => {
    setErrorMessage("");
  };
  return (
    <>
      <AdminNavbar />
      <div className="issuebook-body-bg">
        <PageHeading heading="Issue Book" />
        <div className="container py-5">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-6 col-lg-6 col-xl-6 offset-xl-1">
              <form>
                <div className="row ">
                  {errorMessage && (
                    <p className="text-danger mt-3">{errorMessage}</p>
                  )}
                  <div className="col-md-6">
                    <div className="form-outline mb-3">
                      <label className="form-label issuebook-labels">
                        Book Name
                      </label>
                      <input
                        type="text"
                        value={bookName}
                        className="form-control form-control-sm"
                        placeholder="Book Name"
                        required
                        onChange={(e) => {
                          setBookName(e.target.value);
                          handleInputChange();
                        }}
                      />
                    </div>{" "}
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-3">
                      <label className="form-label issuebook-labels">
                        Book No
                      </label>
                      <input
                        type="number"
                        value={bookNo}
                        className="form-control form-control-sm"
                        placeholder="Book No"
                        required
                        onChange={(e) => {
                          setBookNo(e.target.value);
                          handleInputChange();
                        }}
                      />
                    </div>{" "}
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-3">
                      <label className="form-label issuebook-labels">
                        Author ID
                      </label>
                      <input
                        type="number"
                        value={authorId}
                        className="form-control form-control-sm"
                        placeholder="Author ID"
                        required
                        onChange={(e) => {
                          setAuthorId(e.target.value);
                          handleInputChange();
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-3">
                      <label className="form-label issuebook-labels">
                        User ID
                      </label>
                      <input
                        type="number"
                        value={userId}
                        className="form-control form-control-sm"
                        placeholder="Category ID"
                        required
                        onChange={(e) => {
                          setUserId(e.target.value);
                          handleInputChange();
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline mb-3">
                      <label className="form-label issuebook-labels">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        value={issueDate}
                        className="form-control form-control-sm"
                        placeholder="Issue Date"
                        required
                        onChange={(e) => {
                          setIssueDate(e.target.value);
                          handleInputChange();
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn button-btn btn-sml text-uppercase "
                      type="submit"
                      onClick={handleIssueBook}
                    >
                      {" "}
                      Issue Book
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueBook;
