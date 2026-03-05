import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Furniture from "./pages/Furniture";
import FurnitureDetails from "./pages/FurnitureDetails";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/furniture"
            element={
              <ProtectedRoute requiredRole="admin">
                <Furniture />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/furniture/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <FurnitureDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute requiredRole="admin">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Navigate to="/admin/dashboard" replace />
              </ProtectedRoute>
            }
          />

          {/* Legacy redirects */}
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/orders" element={<Navigate to="/admin/orders" replace />} />
          <Route path="/users" element={<Navigate to="/admin/users" replace />} />
          <Route path="/furniture" element={<Navigate to="/admin/furniture" replace />} />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
