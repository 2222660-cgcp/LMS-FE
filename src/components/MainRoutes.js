import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Authentication/Signup";
import UserLogin from "./Authentication/UserLogin";
import AdminLogin from "./Authentication/AdminLogin";
import Logout from "./Authentication/Logout";
import AdminDashboard from "./Admin/AdminDashboard";
import RegisteredUsers from "./AdminDashboardFeatures/RegisteredUsers";
import AvailableBooks from "./AdminDashboardFeatures/AvailableBooks";
import BooksCategories from "./AdminDashboardFeatures/BooksCategories";
import Authors from "./AdminDashboardFeatures/Authors";
import IssuedBooks from "./AdminDashboardFeatures/IssuedBooks";
import ReservedBooks from "./AdminDashboardFeatures/ReservedBooks";
import AddBook from "./Admin/AddBook";
import ManageBook from "./Admin/ManageBook";
import EditBook from "./Admin/EditBook";
import AddCategory from "./Admin/AddCategory";
import ManageCategory from "./Admin/ManageCategory";
import EditCategory from "./Admin/EditCategory";
import AddAuthor from "./Admin/AddAuthor";
import ManageAuthor from "./Admin/ManageAuthor";
import EditAuthor from "./Admin/EditAuthor";
import ViewFeedback from "./Admin/ViewFeedback";
import IssueBook from "./Admin/IssueBook";
import UserDashboard from "./User/UserDashboard";
import ViewUser from "./User/ViewUser";
import UpdateUser from "./User/UpdateUser";
import ChangePassword from "./User/ChangePassword";
import AvailableBooksUser from "./UserDashboard/AvailableBooksUser";
import ReservedBook from "./UserDashboard/ReservedBook";
import { useSession } from "./Authentication/SessionContext";
import { useEffect } from "react";
import TokenService from "./Authentication/TokenService";
import SessionExpired from "./Authentication/SessionExpired";
import Feedback from "./UserDashboard/Feedback";

const MainRoutes = () => {
  const { isSessionExpired, setSessionExpired } = useSession();

  useEffect(() => {
    const checkToken = () => {
      if (TokenService()) {
        setSessionExpired(true);
      }
    };
    const interval = setInterval(checkToken, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {isSessionExpired && <SessionExpired />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin-dashboard/registered-users"
          element={<RegisteredUsers />}
        />
        <Route
          path="/admin-dashboard/available-books"
          element={<AvailableBooks />}
        />
        <Route
          path="/admin-dashboard/books-categories"
          element={<BooksCategories />}
        />
        <Route path="/admin-dashboard/authors" element={<Authors />} />
        <Route path="/admin-dashboard/issued-books" element={<IssuedBooks />} />
        <Route
          path="/admin-dashboard/reserved-books"
          element={<ReservedBooks />}
        />
        <Route path="/admin-dashboard/add-book" element={<AddBook />} />
        <Route path="/admin-dashboard/manage-book" element={<ManageBook />} />
        <Route
          path="/admin-dashboard/manage-book/edit-book"
          element={<EditBook />}
        />
        <Route path="/admin-dashboard/add-category" element={<AddCategory />} />
        <Route
          path="/admin-dashboard/manage-category"
          element={<ManageCategory />}
        />
        <Route
          path="/admin-dashboard/manage-category/edit-category"
          element={<EditCategory />}
        />
        <Route path="/admin-dashboard/add-author" element={<AddAuthor />} />
        <Route
          path="/admin-dashboard/manage-author"
          element={<ManageAuthor />}
        />
        <Route
          path="/admin-dashboard/manage-author/edit-author"
          element={<EditAuthor />}
        />
        <Route
          path="/admin-dashboard/view-user-feedback"
          element={<ViewFeedback />}
        />
        <Route path="/admin-dashboard/issue-book" element={<IssueBook />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/view-user" element={<ViewUser />} />
        <Route path="/user-dashboard/update-user" element={<UpdateUser />} />
        <Route
          path="/user-dashboard/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/user-dashboard/available-books"
          element={<AvailableBooksUser />}
        />
        <Route
          path="/user-dashboard/reserved-books"
          element={<ReservedBook />}
        />
        <Route path="/user-dashboard/feedback" element={<Feedback />} />

        <Route path="*" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
