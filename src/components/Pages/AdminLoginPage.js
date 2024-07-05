import AdminLogin from "../Authentication/AdminLogin";
import library from "../asset/books4.jpg";

// --------------------------ANAGHA.S.R--------------------------------

const AdminLoginPage = () => {
  return (
    <>
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${library})` }}
      >
        {" "}
        <AdminLogin />
      </div>
    </>
  );
};

export default AdminLoginPage;
