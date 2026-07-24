import express from "express";
import cartModel from "../model/cart.model.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { addToCartValidator, updateCartItemValidator, removeCartItemValidator } from "../validator/cart.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { addToCart, getCart } from "../controller/cart.controller.js"
const router = express.Router();

/**
 * @route POST /cart/add
 * @desc Add item to Cart - Add a product variant to the cart
 * @access Private (Authenticated users)
 */
router.post("/:productId/:variantId", authenticate, addToCartValidator, validate, addToCart);


router.get("/", authenticate, getCart);

export default router;