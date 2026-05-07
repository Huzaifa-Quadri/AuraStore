import { body } from "express-validator";

export const createProductValidator = [
    body("title").isString().trim().notEmpty().isLength({ min: 5, max: 100 }).withMessage("Product title must be between 5 and 100 characters"),
    body("description").isString().trim().notEmpty().isLength({ min: 20, max: 1000 }).withMessage("Product description must be between 20 and 1000 characters"),
    body("price.amount").isNumeric().notEmpty().withMessage("Product price must be a number"),
    body("price.currency").optional().isIn(["INR", "USD", "EUR", "GBP", "JPY", "PKR"]).withMessage("Invalid currency - Must be one of INR, USD, EUR, GBP, JPY, PKR"),
];