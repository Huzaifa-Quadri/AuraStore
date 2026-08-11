import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  addToCartValidator,
  updateCartItemValidator,
  removeCartItemValidator,
} from "../validator/cart.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controller/cart.controller.js";

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

/**
 * @route  PATCH /api/cart/items/:id
 * @desc   Update the quantity of a single cart line.
 * @access Private (authenticated users)
 */
router.patch("/items/:id", authenticate, updateCartItemValidator, validate, updateCartItem);

/**
 * @route  DELETE /api/cart/items/:id
 * @desc   Remove a single line from the cart.
 * @access Private (authenticated users)
 */
router.delete("/items/:id", authenticate, removeCartItemValidator, validate, removeCartItem);

/**
 * @route  DELETE /api/cart
 * @desc   Empty the whole cart.
 * @access Private (authenticated users)
 */
router.delete("/", authenticate, clearCart);

export default router;
