import React from "react";
import { Heart } from "lucide-react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // Check if it's today
  if (date.toDateString() === today.toDateString()) {
    return "TODAY";
  }

  // Check if it's yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return "YESTERDAY";
  }

  // Otherwise, return "DD MMM"
  return date
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    .toUpperCase();
};

const AdCard = ({ ad }) => {
  const { title, location, images, price, date } = ad;

  return (
    <div className="bg-white border shadow-sm overflow-hidden w-64 relative h-65">
      {/* Favorite Button */}
      <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
        <Heart className="w-5 h-5 text-gray-600" />
      </button>
      <div className="">
        {/* Display First Image */}
        <img
          src={images?.length ? images[0] : "/placeholder.jpg"}
          alt={title}
          className="w-full h-40 object-contain"
        />  
      </div>

      {/* Card Content */}
      <div className="p-3">
        <p className="text-xl font-bold text-gray-900">₹ {price}</p>
        <p className="text-sm text-gray-700 truncate font-semibold">{title}</p>

        {/* Location & Formatted Date */}
        <div className="text-xs text-gray-500 mt-1 flex justify-between">
          <span>{location}</span>
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
