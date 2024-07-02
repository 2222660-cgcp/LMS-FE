import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeading from "../Admin/PageHeading";
import MainNavbar from "../Admin/MainNavbar";
import UserNavbar from "../User/UserNavbar";
import "./ReservedBook.css";
import moment from "moment";

const ReservedBook = () => {
  const [message, setMessage] = useState("");
  const [data, setBook] = useState();
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:9095/books/reservations/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBook(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, [username]);

  const handleReturnBook = async (book_Id) => {
    const confirmed = window.confirm("Are you sure want to return this book?");
    if (confirmed) {
      try {
        const response = await axios.put(
          `http://localhost:9095/books/return/${book_Id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBook(data.filter((book) => book.book_Id !== book_Id));
        window.alert("Book is Returned");
      } catch (error) {
        setError(`Book is not Reserved`);
      }
    }
  };

  const handleRenew = async (book_Id) => {
    try {
      const response = await axios.put(
        `http://localhost:9095/books/renew/${book_Id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      window.alert(
        `Book renewed successfully! New due date: ${response.data.dueDate}`
      );
      window.location.reload();
    } catch (error) {
      setMessage(`Failed to renew book: ${error.response.data.message}`);
    }
  };

  const isRenewable = (dueDate) => {
    const today = moment().startOf("day");
    const due = moment(dueDate, "YYYY-MM-DD").startOf("day");
    if (!due.isValid()) {
      console.error("invalid date format");
      return false;
    }
    const diffDays = due.diff(today, "days");
    return diffDays <= 2;
  };

  return (
    <div>
      <MainNavbar />
      <UserNavbar />
      <PageHeading heading="Reserved Books" />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div className="reserved-table-responsive">
          <table className="table table-bordered table-striped text-center book-data">
            <thead className="thead-dark">
              <tr className="table-head">
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  ReservationID
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  ReservedAt
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  BookName
                </th>

                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  DueDate
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Fine
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Renew
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Return
                </th>
              </tr>
            </thead>
            <tbody className="table-data">
              {data.map((book) => (
                <tr className="table-data">
                  <td className="table-data">{book.reservationId}</td>
                  <td className="table-data">{book.reservedAt}</td>
                  <td className="table-data">{book.book_name}</td>

                  <td className="table-data">{book.dueDate}</td>
                  <td className="table-data">
                    <span>₹</span>
                    {book.fine}
                  </td>
                  <td className="table-data">
                    {book.isIssued && isRenewable(book.dueDate) ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleRenew(book.book_Id)}
                      >
                        Renew
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        Renew
                      </button>
                    )}
                  </td>

                  <td className="table-data">
                    {book.isIssued ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleReturnBook(book.book_Id)}
                      >
                        Return
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservedBook;
