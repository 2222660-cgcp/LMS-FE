// --------------------------ANAGHA.S.R--------------------------------

import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isSessionExpired, setSessionExpired] = useState(false);
  return (
    <>
      <SessionContext.Provider value={{ isSessionExpired, setSessionExpired }}>
        {children}
      </SessionContext.Provider>
    </>
  );
};
