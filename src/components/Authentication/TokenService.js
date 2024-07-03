const TokenService = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return true;
  }
  const expirationTime = JSON.parse(atob(token.split(".")[1])).exp * 1000;
  return Date.now() >= expirationTime;
};

export default TokenService;
