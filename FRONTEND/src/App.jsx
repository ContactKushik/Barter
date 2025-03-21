import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, logoutUser } from "./redux/authSlice";
import Login from "./components/Login";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  // Single useEffect for authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthStatus());
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />
      {isAuthenticated ? (
        <>
          <h2 className="text-xl">Welcome, {user?.email}</h2>
          <Button className="mt-3" onClick={() => dispatch(logoutUser())}>
            Logout
          </Button>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
