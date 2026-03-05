import { localStore } from "./localStore";

export const authUtils = {
  // Get token
  getToken: () => localStorage.getItem("token"),

  // Get user role
  getRole: () => localStorage.getItem("role"),

  // Get user
  getUser: () => localStore.getSessionUser(),

  // Set auth data
  setAuthData: (token, role, user = null) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    if (user) {
      localStore.setSessionUser({
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  },

  // Clear auth data
  clearAuthData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStore.clearSessionUser();
  },

  // Check if user is authenticated
  isAuthenticated: () => !!localStorage.getItem("token"),

  // Check if user has specific role
  hasRole: (requiredRole) => {
    const userRole = localStorage.getItem("role");
    return userRole === requiredRole;
  },

  // Check if user has any of the specified roles
  hasAnyRole: (roles) => {
    const userRole = localStorage.getItem("role");
    return roles.includes(userRole);
  },

  // Get axios config with auth headers
  getAuthHeaders: () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "x-user-role": localStorage.getItem("role"),
  }),
};
