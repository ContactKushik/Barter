import React, { useEffect, useMemo } from "react";
import { Heart, MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BarterListing = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const ad = location.state?.ad;
  // console.log(isAuthenticated);
  useEffect(() => {
    console.log("BarterListing component mounted");
    return () => {
      console.log("BarterListing component unmounted");
    };
  }, []);

  if (!ad) {
    return <p className="text-center text-gray-500">Ad not found.</p>;
  }

  const handleChatClick = useMemo(() => {
    return () => {
      if (isAuthenticated) {
        navigate('/chats');
      } else {
        navigate('/login');
      }
    };
  }, [isAuthenticated, navigate]);

  const memoizedAdContent = useMemo(() => (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Image Section */}
      <div className="col-span-2">
        <div className="relative">
          <div className="carousel overflow-hidden w-full h-96">
            <div className="flex transition-transform duration-300 ease-in-out" id="carouselImages">
              {ad.images?.length ? (
                ad.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={ad.title}
                    className="w-full h-full object-cover rounded-lg flex-shrink-0"
                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                  />
                ))
              ) : (
                <img
                  src="/placeholder.jpg"
                  alt={ad.title}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                />
              )}
            </div>
          </div>
          <span className="absolute bottom-2 right-2 bg-black text-white p-1 text-sm rounded-md">
            {ad.images?.length}/{ad.images?.length}
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          {ad.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 border-gray-300"
              onClick={() => {
                const carousel = document.getElementById('carouselImages');
                const selectedImage = carousel.children[index];
                carousel.style.transform = `translateX(-${selectedImage.offsetLeft}px)`;
              }}
              style={{ objectFit: 'cover' }}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 border rounded-lg shadow-lg bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{ad.title}</h2>
          <Heart className="text-gray-500 cursor-pointer" />
        </div>
        <p className="text-2xl font-bold mt-2">₹ {ad.price}</p>
        <p className="text-gray-500 mt-1 flex items-center">
          <MapPin className="mr-2" /> {ad.location}
        </p>
        <button 
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
          onClick={handleChatClick}
        >
          Chat with Seller
        </button>
        <hr className="my-4" />
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="text-gray-600 text-sm mt-1">
          {ad.desc}
        </p>
      </div>

      {/* Location Section */}
      <div className="col-span-3 mt-4">
        <iframe
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.825!2d78.9575!3d20.638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd3a4!2sSamudrapur, Maharashtra, India!5e0!3m2!1sen!2sin!4v1617938398305!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  ), [ad, handleChatClick]);

  return memoizedAdContent;
};

export default BarterListing;
