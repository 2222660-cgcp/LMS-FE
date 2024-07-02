import AdminNavbar from "./AdminNavbar";
import PageHeading from "./PageHeading";
import "./ViewFeedback.css";
import { useState } from "react";
import { useEffect } from "react";

const ViewFeedback = () => {
  const [datas, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:9095/feedback", {
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
    }
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <div className="user-feedbacks-bg">
        <PageHeading heading="User's Feedback" />

        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped text-center">
            <thead className="thead-dark ">
              <tr className="table-head">
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Username
                </th>
                <th
                  className="table-head"
                  style={{ background: "#2c3e50", color: "white" }}
                >
                  Comment
                </th>
              </tr>
            </thead>
            <tbody className="table-data">
              {datas.map((datas) => (
                <tr key={datas.id} className="table-data">
                  <td className="table-data">{datas.username}</td>
                  <td className="table-data">{datas.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewFeedback;
