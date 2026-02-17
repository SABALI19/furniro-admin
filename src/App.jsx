import { Route, BrowserRouter, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Register from "./pages/Register"
import Users from "./pages/Users"
import Login from "./pages/Login"
import Furniture from "./pages/Furniture"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import React from "react"
import Unauthorized from "./pages/Unauthorized"
import ViewDetails from "./pages/ViewDetails"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/view-details/:id" element={
            <ProtectedRoute>
              <ViewDetails />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
