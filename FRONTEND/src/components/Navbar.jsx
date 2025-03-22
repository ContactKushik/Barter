import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { checkAuthStatus, logoutUser } from "@/redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    dispatch(checkAuthStatus()).finally(() => setLoading(false)); // Set loading to false after auth check
  }, [dispatch]);

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">BARTER</div>
      <div>
        {isAuthenticated ? (
          <>
            <span className="mr-4">Welcome, {user.name}</span>
            <Button className="mr-2">Sell</Button>
            <Button onClick={handleLogoutClick}>Logout</Button>
          </>
        ) : (
          <Button onClick={handleLoginClick} disabled={loading}>
            {loading ? (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                alt="Loading..."
                className="w-5 h-5 inline"
              />
            ) : (
              "Login"
            )}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
