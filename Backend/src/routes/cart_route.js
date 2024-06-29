import express from 'express';
// import { createCartItem, getCartItems, removeCartItem } from '../controllers/cart_controller.js';
import { verifyJWT } from '../middleware/auth_middleware.js'; // Import your authentication middleware
import { addToCart, getCart, removeFromCart } from '../controllers/cart_controller.js';

const router = express.Router();
router.post('/add-to-cart', verifyJWT, addToCart);
router.get('/get-cart', verifyJWT, getCart);
router.delete('/remove-from-cart/:productId', verifyJWT, removeFromCart);
export default router;
