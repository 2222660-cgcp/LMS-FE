import Signup from "../Authentication/Signup";
import books2 from "../asset/books4.jpg";

// --------------------------ANAGHA.S.R--------------------------------

const SignupPage = () => {
  return (
    <>
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${books2})` }}
      >
        {" "}
        <Signup />
      </div>
    </>
  );
};

export default SignupPage;
