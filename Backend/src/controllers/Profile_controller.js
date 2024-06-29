import User from "../models/user_model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const updateAvatar = async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        return res.status(400).json({ error: "Avatar file is missing" });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath, 'userAvatar');

    if (!avatar.url) {
        return res.status(400).json({ error: "Error while uploading avatar" });
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: { profilePicture: avatar.url } },
        { new: true }
    ).select("-password");

    return res.status(200).json({ message: "Avatar image updated successfully", user });
};


export const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from the authenticated user
        const updateData = req.body; // Data to update, sent in the request body

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Return 404 if user not found
        }

        // Update the user's data
        Object.assign(user, updateData);

        try {
            // Attempt to save the updated user, Mongoose will validate against the schema
            const updatedUser = await user.save();
            // Omit sensitive data like password and refresh token
            const { password, refreshToken, ...userData } = updatedUser.toObject();
            return res.status(200).json({
                user: userData,
                message: "User profile updated successfully",
            });
        } catch (validationError) {
            // Check if the validation error is due to unique field constraint
            if (validationError.code === 11000 || validationError.name === 'MongoError') {
                let errorMessage = 'Duplicate field value entered';
                if (validationError.keyValue) {
                    // Extract the duplicated field name from the validation error
                    const fieldName = Object.keys(validationError.keyValue)[0];
                    errorMessage += `: ${fieldName} already exists`;
                }
                return res.status(400).json({ message: errorMessage });
            } else {
                return res.status(400).json({ message: validationError.message });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message || "Failed to update user profile" });
    }
};




// // Import necessary modules

// import UserProfile from '../models/userProfile_model.js';

// export const createUserProfile = async (req, res) => {
//     try {
//         const { userId, fullName, address, phone } = req.body;

//         // Create a new user profile instance
//         const newUserProfile = new UserProfile({
//             user: userId, // Associate with the user ID
//             fullName,
//             address,
//             phone
//         });

//         // Save the new user profile to the database
//         await newUserProfile.save();

//         // Respond with success message
//         res.status(201).json({ message: "User profile created successfully" });
//     } catch (error) {
//         // Handle errors
//         console.error("Error creating user profile:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller function to update a user profile
// export const updateUserProfile = async (req, res) => {
//     try {
//         // Extract user profile input from request body
//         const { fullName, address, phone } = req.body;

//         // Find the user profile by ID and update it
//         await UserProfile.findByIdAndUpdate(req.params.id, {
//             fullName,
//             address,
//             phone
//         });

//         // Respond with success message
//         res.status(200).json({ message: "User profile updated successfully" });
//     } catch (error) {
//         // Handle errors
//         console.error("Error updating user profile:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller function to get user profile by ID
// export const getUserProfileById = async (req, res) => {
//     try {
//         // Find the user profile by ID
//         const userProfile = await UserProfile.findById(req.params.id);

//         // If user profile not found, respond with 404 status
//         if (!userProfile) {
//             return res.status(404).json({ message: "User profile not found" });
//         }

//         // Respond with user profile data
//         res.status(200).json(userProfile);
//     } catch (error) {
//         // Handle errors
//         console.error("Error fetching user profile:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
