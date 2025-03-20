import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
export const registerUser = async (req, res) => {
    try {
        const {name,email,password,mobno} = req.body;
        // console.log(name, email, password,mobno);
        // CHECK IF USER ALREADY EXISTS BY CHECKING EMAIL AND MOBILE NO
        // AGAR AISA KOI EMAIL NHI MILEGA TOH WOH NULL RETURN KAREGA
        let user = await userModel.findOne({email: email});
        if(user){
            return res.status(400).send({
                status:"failed",
                message: "User already registered with this email"
            });
        }
        user = await userModel.findOne({mobile: mobno});
        if(user){
            return res.status(400).send({
                status:"failed",
                message: "User already registered with this mobile number"
            });
        }
        // GENERATE SALT AND HASH THE PASSWORD
        let salt =  await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        // CREATE NEW USER
        user =  await userModel.create({
            email,
            password: hash,
            name,
            mobile:mobno,
        })
        res.status(201).send({
            status:"success",
            message: "User registered successfully",
            user
        })
    } catch (error) {
        console.log("error registering user");
        res.status(500).send({
            status:"failed",
            message: "Error registering user",
            error: error.message,
        })
    }
}


export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.onboarding; 
    console.log(token);// Read token from cookies
    if (!token) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const user = await userModel.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    res.status(200).json({ status: "success", user });
  } catch (error) {
    res
      .status(401)
      .json({ status: "failed", message: "Invalid or expired token" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // CHECK IF USER EXISTS BY CHECKING EMAIL
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        status: "failed",
        message: "User not found",
      });
    }

    // COMPARE THE HASHED PASSWORD WITH THE INPUT PASSWORD
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        status: "failed",
        message: "Invalid password",
      });
    }

    // REMOVE PASSWORD AND SELECT REQUIRED FIELDS ONLY
    user = user.toObject(); // Convert user to a plain object
    delete user.password; // Remove password field

    // GENERATE JWT TOKEN
    let token = generateToken({ id: user._id });

    // Set the cookie with the JWT token
    res.cookie("onboarding", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send the response with the user data (without password) and token
    res.status(200).send({
      status: "success",
      message: "User logged in successfully",
      token,
      user, // Send user data without password
    });
  } catch (error) {
    console.log("Error in generating token:", error);
    res.status(500).send({
      status: "failed",
      message: "Error in generating token",
      error: error.message,
    });
  }
};


export const logoutUser = (req,res)=>{
    res.clearCookie("onboarding");
    res.status(200).send({
        status: "success",
        message: "User logged out successfully"
    });
}

export const getUser = (req,res)=>{
    res.send({
        status:"success",
        user:req.user,
        message: "User is logged in"});
    
}