export const authUtils = {
  // Get token
  getToken: () => localStorage.getItem("token"),

  // Get user role
  getRole: () => localStorage.getItem("role"),

  // Set auth data
  setAuthData: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  },

  // Clear auth data
  clearAuthData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
