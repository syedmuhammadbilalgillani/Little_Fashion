import Cart from '../models/cart_model.js';

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; // Assuming you have stored the user ID in req.user after authentication

        // Check if the product already exists in the user's cart
        let cartItem = await Cart.findOne({ user: userId, product: productId });

        if (cartItem) {
            // If the product exists, update the quantity
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // If the product doesn't exist, create a new cart item
            cartItem = await Cart.create({
                user: userId,
                product: productId,
                quantity: quantity
            });
        }

        res.status(201).json({ success: true, message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller to update the quantity of a product in the cart
export const updateCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user._id; // Assuming you have stored the user ID in req.user after authentication

        // Find the cart item
        let cartItem = await Cart.findOne({ user: userId, product: productId });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        // Update the quantity
        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ success: true, message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller to calculate the total price for each cart item
export const calculateTotalPrice = (cartItems) => {
    return cartItems.map(item => ({
        ...item.toObject(),
        totalPrice: item.quantity * item.product.price
    }));
};

// Controller to get the cart of the logged-in user
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have stored the user ID in req.user after authentication
        const cartItems = await Cart.find({ user: userId }).populate({
            path: 'product',
            select: 'name price images', // Select only the necessary fields
        });
        const cartItemsWithTotalPrice = calculateTotalPrice(cartItems);
        res.status(200).json({ success: true, cartItems: cartItemsWithTotalPrice });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// Controller to remove an item or reduce quantity from the cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { removeAll } = req.query; // Check if query parameter 'removeAll' is present

        const userId = req.user._id; // Assuming you have stored the user ID in req.user after authentication

        // Find the cart item
        let cartItem = await Cart.findOne({ user: userId, product: productId });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        if (removeAll && removeAll.toLowerCase() === 'true') {
            // Remove the item completely from the cart
            await Cart.deleteOne({ _id: cartItem._id });
            return res.status(200).json({ success: true, message: 'Product removed from cart' });
        } else {
            // Remove one quantity of the item from the cart
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                await cartItem.save();
            } else {
                // If quantity is already 1, remove the item completely from the cart
                await Cart.deleteOne({ _id: cartItem._id });
            }
            return res.status(200).json({ success: true, message: 'Product removed from cart' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


