import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../models/users.js";
import dotenv from "dotenv";

dotenv.config();

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    console.log(req.cookies.onboarding);
    return req.cookies.onboarding; // Extract the "onboarding" cookie (not "token")
  }
  return null;
};


const options = {
  jwtFromRequest: cookieExtractor, // Use the custom extractor
  secretOrKey: process.env.JWT_SECRET, // Use your JWT secret key
};

const configurePassport = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        // Find the user associated with the token payload
        const user = await userModel.findById(payload.id)
          .select("-password");
          console.log(user);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        return done(null, user);
      } catch (err) {
        console.error("Error in passport strategy:", err);
        return done(err, false);
      }
    })
  );
};

export default configurePassport;
