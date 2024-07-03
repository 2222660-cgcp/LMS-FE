import "./UserDashboard.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "./UserDashboard.css";
import UserNavbar from "./UserNavbar";
import MainNavbar from "../Admin/MainNavbar";

const UserDashboard = () => {
  return (
    <>
      <MainNavbar />
      <UserNavbar />
      <div className="dashboard-body-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-5">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title text-center">Available Books</h6>
                  <Link
                    className="btn dash-button btn-sml text-uppercase"
                    to="/user-dashboard/available-books"
                  >
                    View Books
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-5">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title text-center">Reserved Books</h6>
                  <Link
                    className="btn dash-button btn-sml text-uppercase"
                    to="/user-dashboard/reserved-books"
                  >
                    View Books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserDashboard;
