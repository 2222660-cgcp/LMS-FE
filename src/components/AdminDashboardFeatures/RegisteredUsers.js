import "./RegisteredUsers.css";
import { useState } from "react";
import { useEffect } from "react";
import AdminNavbar from "../layout/AdminNavbar";
import PageHeading from "../layout/PageHeading";
import SearchInput from "../common/SearchInput";

// --------------------------ANAGHA.S.R--------------------------------

const RegisteredUsers = () => {
  const token = localStorage.getItem("token");
  const [datas, setData] = useState([]);
  const [searchedUser, setSearchedUser] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [showFilteredUser, setShowFilteredUser] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    searchUserHandler();
  }, []);

  const searchUserHandler = () => {
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
  };

  const searchUser = (value) => {
    if (value.trim() === "") {
      setSearchedUser([]);
      setShowAllUsers(true);
      setShowFilteredUser(false);
    } else {
      const filteredUser = datas.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filteredUser);
      setSearchedUser(filteredUser);
      setShowAllUsers(false);
      setShowFilteredUser(true);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    searchUser(value);
  };

  return (
    <>
      <AdminNavbar />
      <div className="registeredusers-bg">
        <PageHeading heading="Registered Users" />
        <SearchInput
          placeholder={"Search by Username"}
          value={username}
          onChange={handleInputChange}
        />
        <div className="admin-table-responsive mt-3">
          <table className="table table-bordered table-striped  text-center">
            {(showFilteredUser || showAllUsers) && (
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
                    First Name
                  </th>
                  <th
                    className="table-head"
                    style={{ background: "#2c3e50", color: "white" }}
                  >
                    Last Name
                  </th>
                  <th
                    className="table-head"
                    style={{ background: "#2c3e50", color: "white" }}
                  >
                    Address
                  </th>
                  <th
                    className="table-head"
                    style={{ background: "#2c3e50", color: "white" }}
                  >
                    Phone
                  </th>
                  <th
                    className="table-head"
                    style={{ background: "#2c3e50", color: "white" }}
                  >
                    Email
                  </th>
                </tr>
              </thead>
            )}
            {showFilteredUser &&
              searchedUser.map((user) => (
                <tbody className="table-data">
                  <tr key={user.username} className="table-data">
                    <td className="table-data">{user.username}</td>
                    <td className="table-data">{user.firstname}</td>
                    <td className="table-data">{user.lastname}</td>
                    <td className="table-data">{user.address}</td>
                    <td className="table-data">{user.phone}</td>
                    <td className="table-data">{user.email}</td>
                  </tr>
                </tbody>
              ))}

            {showAllUsers && (
              <tbody className="table-data">
                {datas.map((user) => (
                  <tr key={user.username} className="table-data">
                    <td className="table-data">{user.username}</td>
                    <td className="table-data">{user.firstname}</td>
                    <td className="table-data">{user.lastname}</td>
                    <td className="table-data">{user.address}</td>
                    <td className="table-data">{user.phone}</td>
                    <td className="table-data">{user.email}</td>
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

export default RegisteredUsers;
