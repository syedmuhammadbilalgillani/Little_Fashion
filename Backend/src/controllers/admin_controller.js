// UserController.js

import User from '../models/user_model.js';
import Order from '../models/order_model.js';
import { sendEmail } from '../utils/emailUtils.js';

// Controller function to get all registered users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderData = async (req, res) => {
    try {
        const orders = await Order.find();

        // Loop through orders and fetch user data for each order
        const ordersWithUserData = await Promise.all(orders.map(async (order) => {
            // Use lean() method to convert Mongoose document to plain JavaScript object
            const orderObject = order.toObject();
            // User data fetch karne ke liye user ID ka use karein
            const userData = await User.findById(order.user);
            // User data ko order object ke andar add karein
            orderObject.userData = userData;
            return orderObject;
        }));

        res.status(200).json(ordersWithUserData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const emailTemplateOrderStatusUpdated = (order) => {
    return `
        <h1>Order Status Updated</h1>
        <p>Your order with the following details has been updated:</p>
        <p>Order Number: ${order._id}</p>
        <p>New Status: ${order.status}</p>
        <p>Thank you for shopping with us!</p>
    `;
};
const sendOrderStatusUpdatedEmail = async (recipientEmail, order) => {
    const subject = 'Order Status Updated';
    const htmlContent = emailTemplateOrderStatusUpdated(order);
    await sendEmail(recipientEmail, subject, htmlContent);
};

export const updateOrderStatus = async (req, res, email) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the new status is valid
        if (!Order.schema.path('status').enumValues.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Update the status
        order.status = status;

        // Save the updated order
        await order.save();
        await sendOrderStatusUpdatedEmail(order.email, order);
        // Send success response
        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// Controller function to delete a user by ID
// export const deleteUserById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedUser = await User.findByIdAndDelete(id);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };