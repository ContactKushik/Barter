import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Router components
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuthStatus } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./Home";
// import Sell from "./components/Sell"; // Import Sell component

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
        </Route>

        {/* Route for Login page */}
        {/* <Route path="/sell" element={} /> Route for Sell page */}
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
