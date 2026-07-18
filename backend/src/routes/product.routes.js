import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProduct, getAllProducts, getAllSellerProducts, getProductById, uploadProductImages } from "../controller/product.controller.js";
import upload from "../middleware/multer.middleware.js";
import { createProductValidator } from "../validator/product.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const productRouter = Router();

/**
 * @route   POST /api/products/create
 * @desc    Create a new product
 * @access  Private (seller only)
 */
// productRouter.post("/create", authenticateSeller, upload.array("images", 7), createProductValidator, validate, createProduct);
//? PHASE 1: upload images (multipart). Field name must be "images".
productRouter.post("/upload", authenticateSeller, upload.array("images", 10), uploadProductImages);
//? PHASE 2: create product (JSON). No multer here — express.json() handles the body.
productRouter.post("/create", authenticateSeller, createProductValidator, validate, createProduct);

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

productRouter.get("/:id", getProductById);


export default productRouter;
