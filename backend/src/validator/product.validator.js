import { body } from "express-validator";

export const createProductValidator = [
    body("title").isString().trim().notEmpty().isLength({ min: 5, max: 100 }).withMessage("Product title must be between 5 and 100 characters"),
    body("description").isString().trim().notEmpty().isLength({ min: 20, max: 1000 }).withMessage("Product description must be between 20 and 1000 characters"),
    body("price.amount").isNumeric().notEmpty().withMessage("Price amount must be a number"),
    body("price.currency").optional().isIn(["INR", "USD", "EUR", "GBP", "JPY", "PKR"]).withMessage("Invalid currency"),
    body("category").isString().notEmpty().isIn(["Electronics", "Clothing", "Books", "Home", "Beauty", "Sports", "Other"]).withMessage("Invalid category"),
    body("brand").isString().trim().notEmpty().withMessage("Brand is required"),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

    //* ---- Root images (array). "*" means "every item in the array". ----
    body("images").isArray({min: 1}).withMessage("Atleast one product image is required"),
    body("images.*.url").isURL().withMessage("Invalid image URL"),
    body("images.*.fileId").isString().notEmpty().withMessage("Image fileId must be a string"),

    //* ---- Variants (optional array). Validate each variant's nested fields. ----
    body("variants").optional().isArray().withMessage("Variants must be an array"),
    body("variants.*.price.amount").isNumeric().withMessage("Variant price amount must be a number"),
    body("variants.*.price.currency").optional()
    .isIn(["INR", "USD", "EUR", "GBP", "JPY", "PKR"]),
    body("variants.*.stock").optional().isInt({ min: 0 }),
    body("variants.*.attributes").optional().isObject(),
    body("variants.*.images").optional().isArray().withMessage("Variant images must be an array"),
    body("variants.*.images.*.url").isURL(),
    body("variants.*.images.*.fileId").isString().notEmpty(),
];