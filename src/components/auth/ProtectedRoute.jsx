import React from "react";
import { Navigate } from "react-router-dom";
import { authUtils } from "../../utils/auth";

const ProtectedRoute = ({ children, requiredRole, allowedRoles }) => {
  // Check authentication
  if (!authUtils.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Check for specific required role
  if (requiredRole && !authUtils.hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check if user has any of the allowed roles
  if (allowedRoles && !authUtils.hasAnyRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;