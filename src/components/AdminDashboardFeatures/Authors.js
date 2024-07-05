import { useState } from "react";
import "./Authors.css";
import { useEffect } from "react";
import AdminNavbar from "../layout/AdminNavbar";
import PageHeading from "../layout/PageHeading";
import SearchInput from "../common/SearchInput";

// --------------------------ANAGHA.S.R--------------------------------

const Authors = () => {
  const [datas, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [searchedAuthor, setSearchedAuthor] = useState([]);
  const [showAllAuthors, setShowAllAuthors] = useState(true);
  const [showFilteredAuthor, setShowFilteredAuthor] = useState(false);
  const [authorName, setAuthorName] = useState("");

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

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAuthorName(value);
    searchAuthor(value);
  };

  return (
    <>
      <AdminNavbar />
      <div className="allauthors-bg">
        <PageHeading heading="Authors" />
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
            )}
            {showFilteredAuthor &&
              searchedAuthor.map((author) => (
                <tbody className="table-data">
                  <tr key={author.authorId} className="table-data">
                    <td className="table-data">{author.authorId}</td>
                    <td className="table-data">{author.authorName}</td>
                  </tr>
                </tbody>
              ))}

            {showAllAuthors && (
              <tbody className="table-data">
                {datas.map((author) => (
                  <tr key={author.authorId} className="table-data">
                    <td className="table-data">{author.authorId}</td>
                    <td className="table-data">{author.authorName}</td>
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

export default Authors;
