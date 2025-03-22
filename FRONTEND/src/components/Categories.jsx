import React from "react";
import {
  Car,
  Home,
  Smartphone,
  Briefcase,
//   Bicycle,
  Monitor,
  Truck,
//   Chair,
  Shirt,
  Music,
  PawPrint,
  Wrench,
  ChevronRight,
} from "lucide-react";

const categories = [
  { name: "Cars", icon: <Car /> },
  { name: "Properties", icon: <Home /> },
  { name: "Mobiles", icon: <Smartphone /> },
  { name: "Jobs", icon: <Briefcase /> },
//   { name: "Bikes", icon: <Bicycle /> },
  { name: "Electronics & Appliances", icon: <Monitor /> },
  { name: "Commercial Vehicles & Spares", icon: <Truck /> },
//   { name: "Furniture", icon: <Chair /> },
  { name: "Fashion", icon: <Shirt /> },
  { name: "Books, Sports & Hobbies", icon: <Music /> },
  { name: "Pets", icon: <PawPrint /> },
  { name: "Services", icon: <Wrench /> },
];

const CategorySelection = ({ onSelectCategory }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white border rounded-lg p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">POST YOUR AD</h2>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 text-gray-700 text-sm font-semibold">
          CHOOSE A CATEGORY
        </div>

        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectCategory(category.name)} // On category click, call the onSelectCategory function
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-600">{category.icon}</span>
                <span className="text-gray-800 text-sm">{category.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySelection;
