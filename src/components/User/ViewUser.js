import { useContext } from "react";
import "./UserNavbar.css";
import PageHeading from "../Admin/PageHeading";
import MainNavbar from "../Admin/MainNavbar";
import UserNavbar from "./UserNavbar";
import UserContext from "./UserContext";
import "./ViewUser.css";

const ViewUser = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <MainNavbar />
      <UserNavbar />
      <PageHeading heading="My Profile" />
      <div className="profile-container">
        {user ? (
          <div>
            <p className="user-detail">
              <span className="user-detail-label">Username:</span>
              <span className="user-detail-value">{user.username}</span>
            </p>
            <p className="user-detail">
              <span className="user-detail-label">Name:</span>
              <span className="user-detail-value">
                {user.firstname}&nbsp;{user.lastname}
              </span>
            </p>
            <p className="user-detail">
              <span className="user-detail-label">Email:</span>
              <span className="user-detail-value">{user.email}</span>
            </p>
            <p className="user-detail">
              <span className="user-detail-label">Phone Number:</span>
              <span className="user-detail-value">{user.phone}</span>
            </p>
            <p className="user-detail">
              <span className="user-detail-label">Address:</span>
              <span className="user-detail-value">{user.address}</span>
            </p>
          </div>
        ) : (
          <p className="loading-message">Loading logged-in user details...</p>
        )}
      </div>
    </>
  );
};

export default ViewUser;
