import mongoose from "mongoose";

const { Schema } = mongoose;

// Product Schema
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        badgeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Badge'
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        images: {
            type: [String],
            required: true,
            validate: {
                validator: function (arr) {
                    return arr.length > 0;
                },
                message: 'At least one image is required'
            }
        }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
