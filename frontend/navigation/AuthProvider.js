import React, { createContext } from "react";
import { login, logout } from "../firebase/firebaseFunctions";
import { useState } from "react";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        requests,
        setRequests,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
