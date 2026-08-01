import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { addToCartValidator } from "../validator/cart.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { addToCart, getCart } from "../controller/cart.controller.js";

const router = express.Router();

/**
 * @route  POST /api/cart
 * @desc   Add a product (optionally a specific variant) to the cart.
 *         IDs go in the body rather than the URL so variantId can be omitted
 *         for legacy products that have no variants — a path param can't be
 *         left out.
 * @access Private (authenticated users)
 */
router.post("/", authenticate, addToCartValidator, validate, addToCart);

/**
 * @route  GET /api/cart
 * @desc   Get the current user's cart, re-validated against live product data.
 * @access Private (authenticated users)
 */
router.get("/", authenticate, getCart);

export default router;
