import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProduct, getAllProducts, getAllSellerProducts } from "../controller/product.controller.js";
import upload from "../middleware/multer.middleware.js";
import { createProductValidator } from "../validator/product.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const productRouter = Router();

/**
 * @route   POST /api/products/create
 * @desc    Create a new product
 * @access  Private (seller only)
 */
productRouter.post("/create", authenticateSeller, upload.array("images", 7), createProductValidator, validate, createProduct);

/**
 * @route   GET /api/products/seller/products
 * @desc    Get all products for a seller
 * @access  Private
 */
productRouter.get("/seller/products", authenticateSeller, getAllSellerProducts);


/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
productRouter.get("/", getAllProducts);


export default productRouter;
