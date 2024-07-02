import AdminNavbar from "./AdminNavbar";
import "./ManageAuthor.css";
import PageHeading from "./PageHeading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataNotFound from "./DataNotFound";

const ManageAuthor = () => {
  const [datas, setData] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [searchedAuthor, setSearchedAuthor] = useState([]);
  const [showAllAuthors, setShowAllAuthors] = useState(true);
  const [showFilteredAuthor, setShowFilteredAuthor] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8083/author", {
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
          console.error("Error fetching author data:", error);
        });
    }
  }, [token]);

  const searchAuthorHandler = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const apiUrl = `http://localhost:8083/author/view-author/${authorName}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShowFilteredAuthor(true);
        setShowAllAuthors(false);
        const responseData = response.data;
        console.log(responseData);
        setSearchedAuthor(responseData);
      }
    } catch (error) {
      setShowFilteredAuthor(false);
      setShowAllAuthors(false);
      console.error("Error:", error);
      console.log("Author not found");
    }
  };

  const editAuthorHandler = (authorId) => {
    console.log(".edit.....", authorId);
    navigate("/admin-dashboard/manage-author/edit-author", {
      state: { authorId },
    });
  };

  const deleteAuthorHandler = async (authorId) => {
    const confirmed = window.confirm(
      "Are you sure want to delete this author?"
    );
    if (confirmed) {
      try {
        if (token) {
          const response = await axios.delete(
            `http://localhost:8083/author/${authorId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("delete ", response);
          window.location.reload();
        }
      } catch (error) {
        console.error("error deleting author", error);
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="mngauthor-body-bg">
        <PageHeading heading="Manage Author" />
        <div className="container mt-2">
          <div className="row mb-3">
            <div className="col-md-6 offset-md-3 ">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="authorName"
                  name="authorName"
                  placeholder="Enter Author Name"
                  required
                  onChange={(e) => setAuthorName(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    onClick={searchAuthorHandler}
                  >
                    Search{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!showFilteredAuthor && !showAllAuthors && (
          <DataNotFound data="Author" />
        )}

        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            {(showFilteredAuthor || showAllAuthors) && (
              <thead className="thead-dark">
                <tr>
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
                    Action
                  </th>
                </tr>
              </thead>
            )}
            {showFilteredAuthor && (
              <tbody className="table-data">
                <tr className="table-data">
                  <td className="table-data">{searchedAuthor.authorName}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm btn-spacing"
                      onClick={() => {
                        editAuthorHandler(searchedAuthor.authorId);
                      }}
                    >
                      <i className="fas fa-edit"></i>Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm "
                      onClick={() => {
                        deleteAuthorHandler(searchedAuthor.authorId);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            )}

            {showAllAuthors && (
              <tbody className="table-data">
                {datas.map((author) => (
                  <tr key={author.authorId} className="table-data">
                    <td className="table-data">{author.authorName}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm btn-spacing"
                        onClick={() => {
                          editAuthorHandler(author.authorId);
                        }}
                      >
                        <i className="fas fa-edit"></i>Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm "
                        onClick={() => {
                          deleteAuthorHandler(author.authorId);
                        }}
                      >
                        delete
                      </button>
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

export default ManageAuthor;
