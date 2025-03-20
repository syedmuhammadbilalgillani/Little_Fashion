import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";



dotenv.config();

// api routes
import userRoute from "./routes/user_route.js";
import productRoute from "./routes/product_route.js";
import cartRoute from "./routes/cart_route.js";
import orderRoute from "./routes/order_route.js";
import paymentRoute from "./routes/payment_route.js";
import badgeRoute from "./routes/badge_route.js";
import categoryRoute from "./routes/category_route.js";
import contactFormRoute from "./routes/contactForm_route.js";



const app = express();


// Define the list of allowed origins
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://littlefashion-pi.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, etc)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin ${origin} not allowed`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Apply CORS middleware - Move this BEFORE any route definitions
app.use(cors(corsOptions));

// Handle preflight requests - Keep this line
app.options('*', cors(corsOptions));


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import userProfile from "./routes/userProfile_route.js";




app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/badge", badgeRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/contactForm", contactFormRoute);


export { app };



// // Define the list of allowed origins
// const allowedOrigins = ['http://localhost:5173/', 'https://sub.example.com'];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Use an array of methods
//     credentials: true,
//     optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));