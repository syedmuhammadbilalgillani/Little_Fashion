import { Router } from "express";
import { upload } from "../middleware/multer_middleware.js";
import { createProduct, deleteProductById, editAndUpdateProduct, readProductById, readProducts, removeImage, uploadImage } from "../controllers/product_controller.js";

const router = new Router();
router.get('/read', readProducts);


// ADMIN
router.post("/create", upload.array("images"), createProduct);
router.get('/readById/:productId', readProductById);
router.post('/:productId/image', upload.array("image"), uploadImage);
router.delete('/deleteById/:productId', deleteProductById);
router.put('/editAndUpdate/:productId', editAndUpdateProduct);
router.delete('/:productId/images/:imageIndex', removeImage);
export default router;
