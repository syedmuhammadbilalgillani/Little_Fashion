import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Define a virtual property for the total price
cartSchema.virtual('totalPrice').get(function () {
    // Ensure product has a price
    if (!this.product.price) {
        throw new Error('Product price is not defined');
    }
    // Calculate and return the total price
    return this.quantity * this.product.price;
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
