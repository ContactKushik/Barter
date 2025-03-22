import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Camera, Trash2 } from "lucide-react";

const ImageUpload = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // To track the hovered image

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3 - images.length);
    const urls = files.map((file) => URL.createObjectURL(file));
    const newImages = [...images, ...urls].slice(0, 3);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div>
      <p className="text-lg font-semibold mb-2">UPLOAD UP TO 3 PHOTOS</p>
      <div className="flex gap-2">
        {/* Add Photo Button */}
        {images.length < 3 && (
          <label className="w-24 h-24 border-2 border-gray-400 flex flex-col items-center justify-center rounded cursor-pointer">
            <Camera className="w-6 h-6 text-gray-500" />
            <span className="text-sm">Add Photo</span>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}

        {/* Preview Uploaded Images */}
        {images.map((src, index) => (
          <div
            key={index}
            className="w-24 h-24 border-2 border-gray-300 rounded overflow-hidden relative"
            onMouseEnter={() => setHoveredIndex(index)} // Set the hovered image index
            onMouseLeave={() => setHoveredIndex(null)} // Reset the hovered index
          >
            <img
              src={src}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            {/* Delete Icon */}
            {hoveredIndex === index && (
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
