import { useState } from "react";
import "./Authors.css";
import { useEffect } from "react";
import AdminNavbar from "../Admin/AdminNavbar";
import PageHeading from "../Admin/PageHeading";

const Authors = () => {
  const [datas, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8083/author", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token]);

  return (
    <>
      <AdminNavbar />
      <div className="allauthors-bg">
        <PageHeading heading="Authors" />
        <div className="admin-table-responsive mt-3">
          <table className="table table-bordered table-striped text-center">
            <thead className="thead-dark ">
              <tr className="table-head">
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
                  Author Name
                </th>
              </tr>
            </thead>
            <tbody className="table-data">
              {datas.map((author) => (
                <tr key={author.authorId} className="table-data">
                  <td className="table-data">{author.authorId}</td>
                  <td className="table-data">{author.authorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Authors;
