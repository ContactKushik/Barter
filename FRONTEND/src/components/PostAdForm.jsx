import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createAd } from "../redux/adSlice"; // Importing createAd action
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const PostAdForm = ({ category, onChangeCategory }) => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3 - images.length);
    setImages((prevImages) => [...prevImages, ...files].slice(0, 3));
    setValue("images", files);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("price", data.price);
    formData.append("location", data.location);
    formData.append("status", data.status);
    formData.append("category", category); // Add category to form data
    images.forEach((image) => formData.append("images", image));

    setLoading(true); // Set loading to true when submission starts

    try {
      await dispatch(createAd(formData)).unwrap();
      toast.success("Ad created successfully!");
      navigate("/"); // Redirect to /home on success
    } catch (error) {
      toast.error(error || "Failed to create ad");
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onChangeCategory}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <CardTitle>Post Your Ad in {category}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Title Field */}
          <div>
            <Label>Title</Label>
            <Input
              {...register("title", { required: true })}
              placeholder="Enter title"
            />
          </div>

          {/* Description Field */}
          <div>
            <Label>Description</Label>
            <Textarea
              {...register("desc", { required: true })}
              placeholder="Enter description"
            />
          </div>

          {/* Price Field */}
          <div>
            <Label>Price (₹)</Label>
            <Input
              type="number"
              {...register("price", { required: true })}
              placeholder="Enter price"
            />
          </div>

          {/* Location Field */}
          <div>
            <Label>Location</Label>
            <Input
              {...register("location", { required: true })}
              placeholder="Enter location"
            />
          </div>

          {/* Status Field */}
          <div>
            <Label>Status</Label>
            <select
              {...register("status")}
              className="w-full border p-2 rounded"
            >
              <option value="active">Active</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          {/* Category Display */}
          <div>
            <Label>Category</Label>
            <Input
              value={category} // Display the selected category
              readOnly
              className="bg-gray-100 text-gray-700"
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <Label>Upload Images (Max 3)</Label>
            <div className="flex gap-2 mt-2">
              {images.length < 3 && (
                <label className="w-20 h-20 border-2 border-gray-400 flex flex-col items-center justify-center rounded cursor-pointer">
                  <Camera className="w-6 h-6 text-gray-500" />
                  <span className="text-xs">Add Photo</span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                  />
                </label>
              )}

              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-20 h-20 border-2 border-gray-300 rounded overflow-hidden relative"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Ad"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostAdForm;
