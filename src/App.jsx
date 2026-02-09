import { Route, BrowserRouter, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Users from "./pages/Users"
import Login from "./pages/Login"
import Furniture from "./pages/Furniture"
import Dashboard from "./pages/Dashboard"
import {ToastContainer} from "react-toastify"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import React from "react"
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  )
}

export default App
