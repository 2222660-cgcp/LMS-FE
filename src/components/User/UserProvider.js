import { useState } from "react";
import UserContext from "./UserContext";
import { useEffect } from "react";

// -------------------IBRAHIM BADSHAH-----------------------------------------

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [datas, setData] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setUser({
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            address: data.address,
          });
          console.log(user);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
