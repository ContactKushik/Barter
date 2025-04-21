import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./redux/authSlice";
import { fetchAds } from "./redux/adSlice";
import AdCard from "./components/AdCard";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import Footer from "./Footer";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { ads, loading, error } = useSelector((state) => state.ads);

  useEffect(() => {
    const loadAds = async () => {
      try {
        await dispatch(fetchAds());
      } catch (error) {
        console.error("Error loading ads:", error);
      }
    };

    loadAds();
  }, []); 

  const handleAdClick = (ad) => {
    navigate(`/ad/${ad._id}`, { state: { ad } }); // Redirect to BarterListing with adId
  };

  return (
    <>
      <div className="w-full p-0 min-h-screen">
        <Outlet />
        <div className="flex flex-wrap justify-center gap-2 mt-10 "> {/* Reduced gap from 5 to 2 */}
          {loading && <p>Loading ads...</p>}
          {error && <p>Error loading ads: {error}</p>}
          {ads.map((ad) => (
            <div key={ad._id} onClick={() => handleAdClick(ad)}> {/* Add click handler */}
              <AdCard ad={ad} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
