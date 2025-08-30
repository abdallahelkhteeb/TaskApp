// I want to implement user authentication -> signin, signup, and signout using JWT (JSON Web Tokens)
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt"; 


const generateAccessToken = (user, rememberMe = false) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );
};

export const signup = async (req, res) => {
    const {email, password, rememberMe, name} = req.body;

    // Validate user input
    if (!email || !password || !name) {
        return res.status(400).json({ message: "Email, password, and name are required" });
    }

    // email = email.toLowerCase().trim();
    // password = password.trim();
    // name = name.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({ email, password, name });
    await user.save();

    // Generate a JWT token 
    


    const token = generateAccessToken(user, rememberMe);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.MODE === "deployment", // Keep for HTTPS
      maxAge: rememberMe ? 5 * 24 * 60 * 60 * 1000 : 1 * 24 * 60 * 60 * 1000,
      sameSite: process.env.MODE === "deployment" ? "none" : "lax",
      path: "/", // Ensure the cookie is available across your entire site
    });


    res.status(201).json({ message: "User created successfully" });

}


export const login = async (req, res) => {
    const {email, password, rememberMe} = req?.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: rememberMe ? "7d" : "1h" }
    );

    console.log(token);
        // Set HTTP-only cookie with expiration based on rememberMe
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.MODE === "deployment", // Keep for HTTPS
      maxAge: rememberMe ? 5 * 24 * 60 * 60 * 1000 : 1 * 24 * 60 * 60 * 1000,
      sameSite: process.env.MODE === "deployment" ? "none" : "lax",
      path: "/", // Ensure the cookie is available across your entire site
    });

    res.status(200).json({ message: "User logged in successfully" });
};


export const logout = async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.MODE === "deployment", // Keep for HTTPS
      sameSite: process.env.MODE === "deployment" ? "none" : "lax",
      path: "/", // Ensure the cookie is available across your entire site
    });
    res.status(200).json({ message: "User logged out successfully" });
};
