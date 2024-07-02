import { Link } from "react-router-dom";
import React from "react";
import "./AdminDashboard.css";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="dashboard-body-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-5 mt-5">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title text-center">Registered Users</h6>
                  <Link
                    className="btn dash-button btn-sml text-uppercase"
                    to="/admin-dashboard/registered-users"
                  >
                    View Users
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-5">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title text-center">Available Books</h6>
                  <Link
                    className="btn dash-button btn-sml text-uppercase"
                    to="/admin-dashboard/available-books"
                  >
                    View Books
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-5">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title text-center">Book's Categories</h6>
                  <Link
                    className="btn dash-button btn-sml text-uppercase"
                    to="/admin-dashboard/books-categories"
                  >
                    View Categories
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title text-center">Authors</h6>
                  <Link
                    className="btn dash-button btn-sml text-uppercase"
                    to="/admin-dashboard/authors"
                  >
                    View Authors
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title text-center">Reserved Books</h6>
                  <Link
                    className="btn dash-button btn-sml text-uppercase"
                    to="/admin-dashboard/reserved-books"
                  >
                    View Reserved Books
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title text-center">Issued Books</h6>
                  <Link
                    className="btn dash-button btn-sml text-uppercase"
                    to="/admin-dashboard/issued-books"
                  >
                    View Issued Books
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

export default AdminDashboard;
