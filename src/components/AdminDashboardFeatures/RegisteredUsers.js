import "./RegisteredUsers.css";
import { useState } from "react";
import { useEffect } from "react";
import AdminNavbar from "../Admin/AdminNavbar";
import PageHeading from "../Admin/PageHeading";

const RegisteredUsers = () => {
  const token = localStorage.getItem("token");
  const [datas, setData] = useState([]);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/view-users", {
        method: "GET",
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
      <div className="registeredusers-bg">
        <PageHeading heading="Registered Users" />
        <div className="admin-table-responsive mt-3">
          <table className="table table-bordered table-striped  text-center">
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
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="table-data">
              {datas.map((users) => (
                <tr key={users.username} className="table-data">
                  <td className="table-data">{users.username}</td>
                  <td className="table-data">{users.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RegisteredUsers;
