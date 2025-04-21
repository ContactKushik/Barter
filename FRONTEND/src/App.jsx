  import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
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
  import BarterListing from "./BarterListing";
  import Chatpage from "./Chatpage";
  import { io } from "socket.io-client";

  const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
      if (!isAuthenticated) {
        dispatch(checkAuthStatus()).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
      // console.log(isAuthenticated);
      if (isAuthenticated) {
        console.log("HAA MEIN CHAL RHA HU SOCKET");
        const newSocket = io("http://localhost:8000", {
          withCredentials: true,
          // autoConnect: false,
        });
        setSocket(newSocket);
        
        // Add a 5 second delay before connecting
        // setTimeout(() => {
        //   newSocket.connect();
        // }, 2000);

        return () => {
          if (newSocket) {
            console.log("JAA RHA HU");
            newSocket.disconnect();
          }
        };
      }
    }, [isAuthenticated]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen flex-grow">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/createAd" element={<CreateAdPage />} />
          <Route path="/ad/:ad_id" element={<BarterListing />} />
          <Route
            path="/chats"
            element={isAuthenticated ? <Chatpage socket={socket} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    );
  };

  export default App;
