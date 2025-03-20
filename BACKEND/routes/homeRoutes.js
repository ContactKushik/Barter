import express from "express";
import passport from "passport"; // Import passport
import Ad from "../models/ads.js";
import cloudinary from "../config/cloudinary.js";
import upload from "../utils/multer.js";
import sharp from "sharp";

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("HAA FETCH KRNE KE LIYE GYA MEIN");
  try {
    // Fetch all the ads in the database
    let ads = await Ad.find();
    res.send({
      status: "success",
      data: ads,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Error fetching ads",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const ad = await Ad.find({ user: req.params.id }); // Use findOne with a query

    if (!ad) {
      return res
        .status(404)
        .send({ status: "failed", message: "Ad not found" });
    }
    res.send({ status: "success", data: ad });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Error fetching ad",
      error: error.message,
    });
  }
});

router.get("/ping", (req, res) => {
  res.send({
    status: "success",
    message: "Endpoint working smoothly",
  });
});
// route or creating new add(USER HAS TO BE LOGGED IN ALREADY FOR THIS)
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.array("images", 3), // Allow up to 3 images
  async (req, res) => {
    console.log("HAA CREATE CHALA");
    try {
      if (!req.user) {
        return res.status(401).send({
          status: "failed",
          message: "Unauthorized",
        });
      }

      // Check if images are uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).send({
          status: "failed",
          message: "No images provided",
        });
      }

      // Resize and upload images to Cloudinary
      const uploadedImages = await Promise.all(
        req.files.map(
          async (file) => {
            const resizedImageBuffer = await sharp(file.buffer)
              .resize(720) // Resize to 720 pixels maintaining aspect ratio
              .toBuffer();

            return new Promise((resolve, reject) => {
              cloudinary.uploader
                .upload_stream(
                  { folder: "ads" }, // Store in 'ads' folder
                  (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                  }
                )
                .end(resizedImageBuffer); // Send resized image buffer to Cloudinary
            });
          }
        )
      );

      // Create new ad with uploaded image URLs
      const newAd = new Ad({
        title: req.body.title,
        desc: req.body.desc,
        images: uploadedImages, // Store Cloudinary URLs in DB
        location: req.body.location,
        user: req.user.id,
      });

      const savedAd = await newAd.save();

      res.status(201).send({
        status: "success",
        message: "Ad created successfully",
        data: savedAd,
      });
    } catch (error) {
      res.status(500).send({
        status: "failed",
        message: "Error creating ad",
        error: error.message,
      });
    }
  }
);

// const cloudinary = require("cloudinary").v2;

router.delete(
  "/:ad",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const adId = req.params.ad;
      const ad = await Ad.findById(adId);

      if (!ad) {
        return res.status(404).send({
          status: "failed",
          message: "Ad not found",
        });
      }

      // Ensure the user is the owner of the ad
      if (ad.user.toString() !== req.user.id) {
        return res.status(403).send({
          status: "failed",
          message: "You are not authorized to delete this ad",
        });
      }

      // Delete images from Cloudinary
      if (ad.images && ad.images.length > 0) {
        await Promise.all(
          ad.images.map(async (imageUrl) => {
            const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public_id
            await cloudinary.uploader.destroy(`ads/${publicId}`);
          })
        );
      }

      // Delete the ad from the database
      await Ad.findByIdAndDelete(adId);

      res.status(200).send({
        status: "success",
        message: "Ad and its images deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        status: "failed",
        message: "Error deleting ad",
        error: error.message,
      });
    }
  }
);


// marking deactivate the ad
router.put("/deactivate/:ad",passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const adId = req.params.ad;
      const ad = await Ad.findById(adId);

      if (!ad) {
        return res.status(404).send({
          status: "failed",
          message: "Ad not found",
        });
      }

      // Ensure only the owner can deactivate the ad
      if (ad.user.toString() !== req.user.id) {
        return res.status(403).send({
          status: "failed",
          message: "You are not authorized to deactivate this ad",
        });
      }

      ad.status = "sold"; // Assuming "status" is a field in your Ad model
      await ad.save();

      res.status(200).send({
        status: "success",
        message: "Ad deactivated successfully",
        data: ad,
      });
    } catch (error) {
      res.status(500).send({
        status: "failed",
        message: "Error deactivating ad",
        error: error.message,
      });
    }
  }
);

export default router;
