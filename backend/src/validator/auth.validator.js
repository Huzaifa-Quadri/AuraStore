import { body } from "express-validator";

/**
 * Standard rules for registering a new user
 */
export const registerValidator = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be between 2 and 50 characters"),
  body("contact")
    .trim()
    .notEmpty()
    .withMessage("Contact is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact must be 10 digits long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g)
    .withMessage(
      "Password can only contain letters, numbers, and standard special characters",
    ),
  body("role")
    .optional()
    .isIn(["buyer", "seller", "admin"])
    .withMessage("Invalid role - User can be either buyer, seller or Admin"),
];

/**
 * Standard rules for logging in an existing user
 */
export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];
