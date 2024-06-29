import { Router } from "express";


import { createCategory, deleteCategoryById, getCategories } from "../controllers/Category_controller.js";

const router = new Router();

router.post('/createCategory', createCategory);
router.get('/readCategories', getCategories);   // Get all categories
router.delete('/deleteCategory/:id', deleteCategoryById);
export default router;
