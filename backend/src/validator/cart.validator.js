import { body, param } from "express-validator";

//* ---- Add an item to the cart (create/upsert a cart line) ----
export const addToCartValidator = [
    body("productId").isMongoId().withMessage("A valid productId is required"),
    body("variantId").optional({ nullable: true }).isMongoId().withMessage("variantId must be a valid id"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

//* ---- Update the quantity of an existing cart line ----
export const updateCartItemValidator = [
    param("id").isMongoId().withMessage("A valid cart item id is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

//* ---- Remove a cart line ----
export const removeCartItemValidator = [
    param("id").isMongoId().withMessage("A valid cart item id is required"),
];
