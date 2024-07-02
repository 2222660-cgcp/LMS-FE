import "./ReservedBooks.css";
import AdminNavbar from "../Admin/AdminNavbar";
import PageHeading from "../Admin/PageHeading";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ReservedBooks = () => {
  const [datas, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:9095/books/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching reservation data:", error);
        });
    }
  }, [token]);

  const issueBookHandler = async (reservationId) => {
    try {
      if (token) {
        const response = await axios.post(
          `http://localhost:9095/books/issue-book/${reservationId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.location.reload(true);
        console.log("Book issued", response.data);
      }
    } catch (error) {
      console.error("error in issuing book", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="reservedbooks-body-bg">
        <PageHeading heading="Reserved Books" />
        <div className="admin-table-responsive mt-3">
          <table className="table table-bordered table-striped  text-center">
            <thead className="thead-dark ">
              <tr className="table-head">
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  User ID
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
                  Reserved Date
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="table-data">
              {datas.map((reservations) => (
                <tr key={reservations.reservationId} className="table-data">
                  <td className="table-data">{reservations.username}</td>
                  <td className="table-data">{reservations.book_Id}</td>
                  <td className="table-data">{reservations.book_name}</td>
                  <td className="table-data">{reservations.reservedAt}</td>
                  <td>
                    {reservations.isIssued == true ? (
                      <span>Issued</span>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm btn-spacing"
                        onClick={() =>
                          issueBookHandler(reservations.reservationId)
                        }
                      >
                        <i className="fas fa-edit"></i>Issue Book
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

export default ReservedBooks;
