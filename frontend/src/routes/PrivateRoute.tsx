import { Navigate } from "react-router-dom";
import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({
  children
}: PrivateRouteProps) {

  const token = localStorage.getItem("@token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;