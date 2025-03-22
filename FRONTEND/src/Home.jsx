import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./redux/authSlice";
import { fetchAds } from "./redux/adSlice";
import AdCard from "./components/AdCard";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAds()); // Load ads on mount
  }, [dispatch]);
  return (
    <>
      <div className="w-full p-0 h-full">
        <Navbar />
        <Outlet />
        <div className="flex flex-wrap justify-center gap-5 mt-10 h-screen">
          {loading && <p>Loading ads...</p>}
          {error && <p>Error loading ads: {error}</p>}
          {ads.map((ad) => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
