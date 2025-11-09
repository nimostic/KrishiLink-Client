import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  if (loading) {
    return <span className="loading loading-spinner text-info"></span>;
  }

  if (user && user.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/register"></Navigate>;
};

export default PrivateRoute;
