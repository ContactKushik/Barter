
import express from "express";
import {
  checkAuth,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth",checkAuth);
router.get("/",(req,res)=>{
    res.send("Its working");
})

// Protect profile route with Passport JWT
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getUser
);  

export default router;

