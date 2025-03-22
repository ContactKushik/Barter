import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Router components
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuthStatus } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Footer from "./Footer";
import PostAdForm from "./components/PostAdForm";
import CreateAdPage from "./CreateAdPage";
// import Sell from "./components/Sell"; // Import Sell component

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen flex-grow">
      <ToastContainer />
      <Navbar />
      {/* <div className="flex-grow"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          {/* Add more routes as needed */}
          <Route path="/createAd" element={<CreateAdPage/>}/>
        </Routes>
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default App;
