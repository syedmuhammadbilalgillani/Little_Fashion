import { Router } from "express";
import { Logout, createUser, login, getMyProfile } from "../controllers/user_controller.js";
import { verifyJWT } from "../middleware/auth_middleware.js";
import { generateAndSendOTP, updatePassword, verifyOTP } from "../controllers/forgetPassword_controller.js";
import { upload } from "../middleware/multer_middleware.js"
import { updateAvatar, updateMyProfile } from "../controllers/Profile_controller.js";
import { getAllUsers, getOrderData, updateOrderStatus } from "../controllers/admin_controller.js";


const router = new Router();


router.post("/create", createUser)


router.post("/login", login)
router.get('/profile', verifyJWT, getMyProfile);
router.get("/logout", Logout)


router.post("/generateAndSendOTP", generateAndSendOTP)
router.post("/verifyOTP", verifyOTP)
router.post("/updatePassword", updatePassword)
// router.get('/user', authenticateToken, getUserData);



router.post("/avatar", verifyJWT, upload.single("profilePicture"), updateAvatar)
router.put('/update', verifyJWT, updateMyProfile);



router.get('/readAllUsers', getAllUsers);
router.get('/users-with-orders', getOrderData);
router.put('/orders/:orderId/status', updateOrderStatus);
// router.delete('/delete/:id', deleteUserById);   //DELETE USER ROUTE
export default router