import Cart from '../models/cart_model.js';
import Order from '../models/order_model.js';
import Payment from '../models/payment_model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { sendEmail } from '../utils/emailUtils.js';

const emailTemplateOrderPlaced = (order) => {
    return `
        <h1>Order Placed Successfully</h1>
        <p>Your order has been placed successfully with the following details:</p>
        <p>Order Number: ${order._id}</p>
        <p>Total Price: ${order.totalPrice}</p>
        <p>Order Status: ${order.status}</p>
        <p>Thank you for shopping with us!</p>
    `;
};
const sendOrderPlacedEmail = async (email, order) => {
    const subject = 'Order Placed Successfully';
    const htmlContent = emailTemplateOrderPlaced(order);
    await sendEmail(email, subject, htmlContent);
};
export const checkout = async (req, res) => {
    try {
        const { name, email, phone, address, paymentMethod, transactionId, transactionName } = req.body;
        const userId = req.user._id;
        let transactionImage;
        if (req.file) {
            transactionImage = req.file.path;
        }

        const cartItems = await Cart.find({ user: userId }).populate({
            path: 'product',
            select: 'name price', // Select only the necessary fields
        });

        // 2. Calculate total price and quantities for the order
        let totalPrice = 0;
        let totalQuantity = 0;
        const orderProducts = cartItems.map(cartItem => {
            const productPrice = cartItem.product.price; // Price of the individual product
            const productTotalPrice = cartItem.quantity * productPrice;
            totalPrice += productTotalPrice;
            totalQuantity += cartItem.quantity;
            return {
                product: cartItem.product._id,
                productName: cartItem.product.name,
                quantity: cartItem.quantity,
                price: productPrice, // Add price of individual product
                totalPrice: productTotalPrice
            };
        });

        // 3. Determine transaction type and validate bank account name based on payment method
        let transactionType;
        let paymentDetails; // To store payment details
        if (paymentMethod === 'CashOnDelivery') {
            transactionType = 'CashOnDelivery';
            // Set payment details for Cash On Delivery
            paymentDetails = 'CashOnDelivery';
        } else if (paymentMethod === 'Online' && transactionId && transactionName) {
            // Validate bank account name against transaction name
            const existingPayment = await Payment.findOne({ bankAccountName: transactionName });
            const cloudinaryResponse = await uploadOnCloudinary(transactionImage, 'transactionImage');
            if (existingPayment) {
                // Bank account name matches, proceed with online payment
                const imageUrl = cloudinaryResponse.url;
                paymentDetails = {
                    transactionType: 'Online',
                    transactionId: transactionId,
                    bankAccountName: transactionName,
                    transactionImage: imageUrl  // Include transaction image if provided
                };
                transactionType = 'Online';
            } else {
                throw new Error('Bank account name does not match with provided transaction name.');
            }
        } else {
            throw new Error('Invalid payment method or missing transaction details for online payment.');
        }

        // 5. Save order to the database
        const order = await Order.create({
            user: userId, // Include user ID in the order
            name: name,
            email: email,
            phone: phone,
            address: address,
            products: orderProducts,
            totalPrice: totalPrice,
            totalQuantity: totalQuantity,
            status: 'Pending',
            payment: paymentDetails, // Include payment details
            transactionType: transactionType // Set transaction type
        });

        // 6. Clear user's cart after creating the order
        await Cart.deleteMany({ user: userId });
        await sendOrderPlacedEmail(email, order);
        // 7. Return success response with order and user data
        res.status(200).json({ message: "Order placed successfully", order });
    } catch (error) {
        // 8. Handle errors
        res.status(500).json({ success: false, error: error.message });
    }
};


export const getOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch orders of the user
        const orders = await Order.find({ user: userId });

        // Return success response with the user's order history
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};





// export const checkout = async (req, res) => {
//     try {
//         const { name, email, phone, address, paymentMethod } = req.body; // Include paymentMethod in request body

//         const userId = req.user._id;

//         // Fetch cart items of the user
//         const cartItems = await Cart.find({ user: userId }).populate({
//             path: 'product',
//             select: 'name price', // Select only the necessary fields
//         });

//         // Calculate total price and quantities for the order
//         let totalPrice = 0;
//         let totalQuantity = 0;
//         const orderProducts = cartItems.map(cartItem => {
//             const productPrice = cartItem.product.price; // Price of the individual product
//             const productTotalPrice = cartItem.quantity * productPrice;
//             totalPrice += productTotalPrice;
//             totalQuantity += cartItem.quantity;
//             return {
//                 product: cartItem.product._id,
//                 productName: cartItem.product.name,
//                 quantity: cartItem.quantity,
//                 price: productPrice, // Add price of individual product
//                 totalPrice: productTotalPrice
//             };
//         });

//         // Save payment details if payment method is 'Online'
//         let payment;
//         if (paymentMethod === 'Online') {
//             // Extract payment details from request body
//             const { bankAccountName, bankAccountNumber, accountTitle, transactionId, transactionImage } = req.body;

//             // Create payment document
//             payment = await Payment.create({
//                 user: userId,
//                 bankAccountName,
//                 bankAccountNumber,
//                 accountTitle,
//                 transactionId,
//                 transactionType: 'Online', // Set transaction type to 'Online'
//                 transactionImage
//             });
//         }

//         // Save order to the database
//         const order = await Order.create({
//             user: userId, // Include user ID in the order
//             name: name,
//             email: email,
//             phone: phone,
//             address: address,
//             products: orderProducts,
//             totalPrice: totalPrice, // Save total price
//             totalQuantity: totalQuantity, // Save total quantity
//             status: 'Pending', // Set default status to 'Pending'
//             payment: payment ? payment._id : undefined // Include payment reference if payment is made online
//         });

//         // Clear user's cart after creating the order
//         await Cart.deleteMany({ user: userId });

//         // Return success response with order and user data
//         res.status(200).json({ message: "Order placed successfully", order });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// // Controller to get orders for a user
// export const getUserOrders = async (req, res) => {
//     try {
//         const userId = req.user._id; // Assuming you have stored the user ID in req.user after authentication
//         const orders = await Order.find({ user: userId }).populate('products');
//         res.status(200).json({ success: true, orders: orders });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };
