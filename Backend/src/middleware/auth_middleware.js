
import jwt from "jsonwebtoken"
import User from "../models/user_model.js";
import dotenv from "dotenv";



dotenv.config();
export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error("Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // console.log("Decoded Token:", decodedToken); // Debugging: Log decoded token

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // console.log("User:", user); // Debugging: Log user object

        if (!user) {
            throw new Error("Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        // console.error("JWT Verification Error:", error); // Debugging: Log any errors
        res.status(401).json({ message: error.message || "Invalid access token" });
    }
};
