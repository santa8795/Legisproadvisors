import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Path apne project ke hisaab se check kar lein

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Agar user authenticated nahi hai (ya refresh karne pe state null ho gayi hai),
  // toh usko wapas Login page pe bhej do
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar logged in hai, toh Dashboard (children) dikhao
  return children;
};

export default ProtectedRoute;