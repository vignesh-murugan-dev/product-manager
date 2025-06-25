import express from 'express';
import productController from '../controllers/productController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

// Public route to get all products
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Private rotues (requires authentication)
router.use(authController.protect);
router.post("/", productController.createProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;