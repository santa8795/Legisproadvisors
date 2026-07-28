import React, { createContext, useState, useContext } from "react";
import { setAuthToken } from "../api/axios"; // Aapka api file path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Login function
  const login = (newToken) => {
    setToken(newToken);       // React State me token save (for UI)
    setAuthToken(newToken);   // Axios ke liye in-memory token save
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook use karne ke liye
export const useAuth = () => useContext(AuthContext);