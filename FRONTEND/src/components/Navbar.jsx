import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleSellClick = () => {
    navigate("/createAd");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div
        className="text-lg font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        BARTER
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <span className="mr-4">Welcome, {user?.name}</span>
            <Button
              className="mr-2 hover:bg-gray-700 text-lg"
              onClick={handleSellClick}
            >
              Sell
            </Button>
            <Button
              onClick={handleLogoutClick}
              className="hover:bg-red-700 text-lg"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
