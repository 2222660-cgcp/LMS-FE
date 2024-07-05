import UserLogin from "../Authentication/UserLogin";
import library from "../asset/books4.jpg";

// --------------------------IBRAHIM BADSHAH--------------------------------

const UserLoginPage = () => {
  return (
    <>
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${library})` }}
      >
        {" "}
        <UserLogin />
      </div>
    </>
  );
};

export default UserLoginPage;
