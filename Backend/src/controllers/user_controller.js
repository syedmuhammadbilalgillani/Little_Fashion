import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";



dotenv.config();
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if required fields are provided
        const requiredFields = [
            { field: username, message: "Username is required" },
            { field: email, message: "Email is required" },
            { field: password, message: "Password is required" },
        ];

        for (let i = 0; i < requiredFields.length; i++) {
            if (!requiredFields[i].field) {
                return res.status(400).json({ message: requiredFields[i].message });
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password strength
        // For example, you can set a minimum length for the password
        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: "Password must be at least 8 characters long" });
        }

        // Validate username length
        if (username.length < 5 || username.length > 20) {
            return res
                .status(400)
                .json({ message: "Username must be between 5 and 20 characters long" });
        }

        // Check if username or email already exists
        const existingData = await User.findOne({
            $or: [{ username }, { email }],
        });

        const validations = [
            {
                condition: existingData && existingData.username === username,
                message: "Username already exists",
            },
            {
                condition: existingData && existingData.email === email,
                message: "Email already exists",
            },
        ];

        for (let i = 0; i < validations.length; i++) {
            if (validations[i].condition) {
                return res.status(400).json({ message: validations[i].message });
            }
        }

        // Create new user
        const newUser = new User({
            username: username.toLowerCase(),
            email,
            password,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Logout = (req, res) => {
    res.clearCookie("access_token").status(200).json("Signout success!");
};

export const getMyProfile = async (req, res) => {
    try {
        const user = req.user; // User object should be attached to the request
        if (!user) {
            throw new Error("User not found");
        }
        // Omit sensitive data like password and refresh token
        const { password, refreshToken, ...userData } = user.toObject();
        res.status(200).json({
            user: userData,
            message: "User fetched successfully",
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: error.message || "Failed to fetch user profile" });
    }
};
export async function login(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Find user by email (case-insensitive) and populate the userProfile field
        const user = await User.findOne({ email: email.toLowerCase() });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Verify password
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate and send access token
        const accessToken = user.generateAccessToken(user);

        res
            .cookie("access_token", accessToken, { httpOnly: true, secure: true })
            .status(200)
            .json({
                message: "Login Successfully",
                accessToken,
                user,
            });
    } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ message: "Login failed. Please try again later." });
    }
}



export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(" ").join("").toLowerCase() +
                    Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
