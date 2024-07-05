// --------------------------ANAGHA.S.R--------------------------------

import HomePage from "../Pages/HomePage";

const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("authenticated");
  sessionStorage.clear();
  return (
    <>
      <HomePage />
    </>
  );
};

export default Logout;
