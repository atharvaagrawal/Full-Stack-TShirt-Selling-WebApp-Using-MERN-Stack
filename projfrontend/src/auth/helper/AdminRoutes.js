import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ children }) => {
  const auth = isAuthenticated() && isAuthenticated().user.role === 1;
  return auth ? children : <Navigate to="/signin" />;
};

export default AdminRoute;
