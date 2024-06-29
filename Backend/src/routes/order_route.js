import express from 'express';
import { checkout, getOrder } from '../controllers/order_controller.js';
import { verifyJWT } from '../middleware/auth_middleware.js';
import { upload } from '../middleware/multer_middleware.js';

const router = express.Router();

// Route for handling checkout
router.post('/checkout', verifyJWT, upload.single('transactionImage'), checkout);
router.get('/readOrders', verifyJWT, getOrder);


export default router;
