import AdminNavbar from "../layout/AdminNavbar";
import "./ManageAuthor.css";
import PageHeading from "../layout/PageHeading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SearchInput from "../common/SearchInput";

// --------------------------ANAGHA.S.R--------------------------------

const ManageAuthor = () => {
  const [datas, setData] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [searchedAuthor, setSearchedAuthor] = useState([]);
  const [showAllAuthors, setShowAllAuthors] = useState(true);
  const [showFilteredAuthor, setShowFilteredAuthor] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    searchAuthorHandler();
  }, []);

  const searchAuthorHandler = () => {
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
  };

  const searchAuthor = (value) => {
    if (value.trim() === "") {
      setSearchedAuthor([]);
      setShowAllAuthors(true);
      setShowFilteredAuthor(false);
    } else {
      const filteredAuthor = datas.filter((author) =>
        author.authorName.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filteredAuthor);
      setSearchedAuthor(filteredAuthor);
      setShowAllAuthors(false);
      setShowFilteredAuthor(true);
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

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAuthorName(value);
    searchAuthor(value);
  };

  return (
    <>
      <AdminNavbar />
      <div className="mngauthor-body-bg">
        <PageHeading heading="Manage Author" />
        <SearchInput
          placeholder={"Search by Author Name"}
          value={authorName}
          onChange={handleInputChange}
        />

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
            {showFilteredAuthor &&
              searchedAuthor.map((author) => (
                <tbody className="table-data">
                  <tr key={author.authorId} className="table-data">
                    <td className="table-data">{author.authorName}</td>
                    <td className="table-data ">
                      <button
                        className="btn btn-sm btn-spacing"
                        onClick={() => {
                          editAuthorHandler(author.authorId);
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm "
                        onClick={() => {
                          deleteAuthorHandler(author.authorId);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}

            {showAllAuthors && (
              <tbody className="table-data">
                {datas.map((author) => (
                  <tr key={author.authorId} className="table-data">
                    <td className="table-data">{author.authorName}</td>
                    <td className="table-data ">
                      <button
                        className="btn btn-sm btn-spacing"
                        onClick={() => {
                          editAuthorHandler(author.authorId);
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm "
                        onClick={() => {
                          deleteAuthorHandler(author.authorId);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
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
