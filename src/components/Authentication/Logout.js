import Signup from "./Signup";

const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  sessionStorage.clear();
  return (
    <>
      <Signup />
    </>
  );
};

export default Logout;
