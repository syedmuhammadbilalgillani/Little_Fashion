// controllers/productController.js

import { upload } from '../middleware/multer_middleware.js';
import Product from '../models/product_model.js';
import Badge from '../models/badge_model.js';
import Category from '../models/category_model.js';

import { uploadOnCloudinary } from '../utils/cloudinary.js';


// export const createProduct = async (req, res) => {
//     try {
//         const { name, description, price, badgeId, categoryId } = req.body;
//         // Check if req.files exists and is an array before mapping
//         // const images = req.files && Array.isArray(req.files) ? req.files.map(file => file.path) : [];
//         // if (images.length === 0) {
//         //     return res.status(400).json({ message: 'No images uploaded' });
//         // }
//         // // Fetch category and badge details
//         const badge = await Badge.findById(badgeId);
//         const category = await Category.findById(categoryId);



//         // Validate inputs
//         const missingFields = [];
//         if (!name) missingFields.push('name');
//         if (!description) missingFields.push('description');
//         if (!price) missingFields.push('price');
//         if (!badgeId) missingFields.push('badgeId');
//         if (!categoryId) missingFields.push('categoryId');
//         // if (!images) missingFields.push('images');

//         if (missingFields.length > 0) {
//             return res.status(400).json({ message: `${missingFields.join(', ')} missing` });
//         }
//         // Upload images to Cloudinary
//         // const cloudinaryPromises = images.map(image =>
//         //     uploadOnCloudinary(image, 'productImages') // Change 'YourFolderNameHere' to the desired folder name
//         // );
//         // const cloudinaryResults = await Promise.all(cloudinaryPromises);
//         // const imageUrls = cloudinaryResults.map(result => result.url);


//         // Create the product
//         const newProduct = new Product({
//             name,
//             description,
//             price,
//             badge: badgeId,
//             category: categoryId,
//             // images: imageUrls
//         });

//         await newProduct.save();
//         await newProduct.populate('badgeId', 'name').execPopulate();
//         await newProduct.populate('categorygeId', 'name').execPopulate();
//         res.status(201).json({ message: 'Product created successfully', product: newProduct });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, badgeId, categoryId } = req.body;
        // Check if req.files exists and is an array before mapping
        
        const images = req.files && Array.isArray(req.files) ? req.files.map(file => file.path) : [];
        if (images.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        // Fetch category and badge details
        const badge = await Badge.findById(badgeId);
        const category = await Category.findById(categoryId);

        if (!badge || !category) {
            return res.status(404).json({ error: 'Badge or Category not found' });
        }

        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!description) missingFields.push('description');
        if (!price) missingFields.push('price');
        if (!badgeId || !badge) missingFields.push('badgeId');
        if (!categoryId || !category) missingFields.push('categoryId');
        if (!images) missingFields.push('images');

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `${missingFields.join(', ')} missing` });
        }

        // Upload images to Cloudinary
        const cloudinaryPromises = images.map(image =>
            uploadOnCloudinary(image, 'productImages') // Change 'YourFolderNameHere' to the desired folder name
        );
        const cloudinaryResults = await Promise.all(cloudinaryPromises);
        const imageUrls = cloudinaryResults.map(result => result.url);

        // Create the product
        const newProduct = new Product({
            name,
            description,
            price,
            badgeId: badge._id,
            categoryId: category._id,
            images: imageUrls
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const editAndUpdateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { name, description, price, badgeId, categoryId, removeImageUrls } = req.body;
        // Check if req.files exists and is an array before mapping
        const images = req.files && Array.isArray(req.files) ? req.files.map(file => file.path) : [];
        // Fetch category and badge details
        const badge = await Badge.findById(badgeId);
        const category = await Category.findById(categoryId);
        // Validate inputs
        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!description) missingFields.push('description');
        if (!price) missingFields.push('price');
        if (!badgeId) missingFields.push('badgeId');
        if (!categoryId) missingFields.push('categoryId');

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `${missingFields.join(', ')} missing` });
        }

        // Construct update object
        const update = {
            name,
            description,
            price,
            badgeId: badge._id,
            categoryId: category._id
        };

        // Remove images if specified
        if (removeImageUrls && Array.isArray(removeImageUrls) && removeImageUrls.length > 0) {
            // Find the product
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            // Remove specified image URLs from the product's images array
            removeImageUrls.forEach(removeImageUrl => {
                const index = product.images.indexOf(removeImageUrl);
                if (index !== -1) {
                    product.images.splice(index, 1);
                }
            });
            // Save the updated product with removed images
            await product.save();
        }

        // Update images if any
        if (images.length > 0) {
            const cloudinaryPromises = images.map(image =>
                uploadOnCloudinary(image, 'productImages')
            );
            const cloudinaryResults = await Promise.all(cloudinaryPromises);
            const imageUrls = cloudinaryResults.map(result => result.url);
            update.images = imageUrls;
        }

        // Find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(productId, update, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const readProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export const readProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}






export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const removeImage = async (req, res) => {
    try {
        const productId = req.params.productId;
        const imageIndex = req.params.imageIndex; // Assuming imageIndex is passed as a parameter

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the image index is valid
        if (imageIndex < 0 || imageIndex >= product.images.length) {
            return res.status(400).json({ message: 'Invalid image index' });
        }

        // Remove the image at the specified index
        const removedImage = product.images.splice(imageIndex, 1)[0]; // Remove and get the removed image

        // Save the updated product
        await product.save();

        // Optionally, you can delete the image from your storage system (e.g., filesystem, cloud storage)
        // Code to delete the image from storage goes here

        res.status(200).json({ message: 'Image removed successfully', removedImage });
    } catch (error) {
        console.error('Error removing image:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const uploadImage = async (req, res) => {
    try {
        const productId = req.params.productId;
        // Check if req.files exists and is an array before mapping
        const newImages = req.files && Array.isArray(req.files) ? req.files.map(file => file.path) : [];

        if (newImages.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        // Find the product by ID
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Fetch existing images
        const existingImages = product.images || [];

        // Combine new and existing images
        const allImages = [...existingImages, ...newImages];

        // Upload new images to Cloudinary
        const cloudinaryPromises = newImages.map(image =>
            uploadOnCloudinary(image, 'productImages') // Change 'YourFolderNameHere' to the desired folder name
        );
        const cloudinaryResults = await Promise.all(cloudinaryPromises);
        const newImageUrls = cloudinaryResults.map(result => result.url);

        // Combine new and existing image URLs
        const updatedImageUrls = [...existingImages, ...newImageUrls];

        // Update the product document with the combined image URLs
        product.images = updatedImageUrls;
        await product.save();

        return res.status(200).json({ message: 'Images uploaded successfully', imageURLs: updatedImageUrls });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }

};









// export const editAndUpdateProduct = async (req, res) => {
//     try {
//         const productId = req.params.productId;
//         const updates = req.body;
//         const product = await Product.findByIdAndUpdate(productId, updates, { new: true });

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product updated successfully', product });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// }







// export const editAndUpdateProduct = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const { name, description, price, badgeId, badgeName, categoryId, categoryName } = req.body;

//         // Check if req.files exists and is an array before mapping
//         const images = req.files && Array.isArray(req.files) ? req.files.map(file => file.path) : [];

//         // Update product using findByIdAndUpdate
//         const updatedProduct = await Product.findByIdAndUpdate(productId, {
//             $set: {
//                 name,
//                 description,
//                 price,
//                 badge: { name: badgeName, badgeId: badgeId },
//                 category: { name: categoryName, categoryId: categoryId },
//                 images: [...images, ...(updatedProduct.images || [])] // Concatenating new images with existing ones
//             }
//         }, { new: true });

//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };








// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: 'your_cloud_name',
//     api_key: 'your_api_key',
//     api_secret: 'your_api_secret'
// });



// export const createProduct = async (req, res) => {
//     try {
//         const { name, description, price, categoryId, badgeId } = req.body;

//         // Check if req.files exists and is an array before mapping
//         const images = req.files && Array.isArray(req.files) ? req.files.map(file => file.path) : [];

//         if (images.length === 0) {
//             return res.status(400).json({ message: 'No images uploaded' });
//         }

//         // Validate inputs
//         const missingFields = [];
//         if (!name) missingFields.push('name');
//         if (!description) missingFields.push('description');
//         if (!price) missingFields.push('price');
//         if (!categoryId) missingFields.push('categoryId');
//         if (!images) missingFields.push('images');

//         if (missingFields.length > 0) {
//             return res.status(400).json({ message: `${missingFields.join(', ')} missing` });
//         }

//         // Find category and badge by IDs
//         const category = await Category.findById(categoryId);
//         const badge = await Badge.findById(badgeId);

//         if (!category) {
//             return res.status(400).json({ message: 'Invalid category ID' });
//         }

//         if (!badge) {
//             return res.status(400).json({ message: 'Invalid badge ID' });
//         }

//         // Upload images to Cloudinary
//         const cloudinaryPromises = images.map(image =>
//             uploadOnCloudinary(image, 'productImages') // Change 'YourFolderNameHere' to the desired folder name
//         );
//         const cloudinaryResults = await Promise.all(cloudinaryPromises);
//         const imageUrls = cloudinaryResults.map(result => result.url);

//         const product = new Product({
//             name,
//             description,
//             price,
//             category: category._id, // Assign category ID
//             images: imageUrls,
//             badge: badge._id // Assign badge ID
//         });

//         await product.save();
//         res.status(201).json({ message: 'Product created successfully', product: product });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };