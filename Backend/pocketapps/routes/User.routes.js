const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const upload = require("../middleware/multerConfig");
const authMiddleware = require("../middleware/authMiddleware");

const userController = require("../controller/user.controller");
const todosController = require("../controller/todotask.controller");

// 🔒 Validation Rules
const registrationValidationRules = [
  body("fullname")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be 3–50 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Only letters and spaces allowed"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
    .withMessage("Email must be in lowercase only"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Minimum 6 characters")
    .matches(/[A-Z]/)
    .withMessage("One uppercase letter required")
    .matches(/[a-z]/)
    .withMessage("One lowercase letter required")
    .matches(/[0-9]/)
    .withMessage("One number required")
    .matches(/[@$!%*?&]/)
    .withMessage("One special character required"),
];

const loginValidationRules = [
  body("email").notEmpty().withMessage("Email is required").isEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 🟢 Routes
router.post(
  "/register",
  registrationValidationRules,
  validateRequest,
  userController.createmypocketinfo
);

router.post(
  "/login",
  loginValidationRules,
  validateRequest,
  userController.loginmypocketinfo
);

router.post("/forgot-password", userController.forgotPassword);

router.post(
  "/upload-aadhaar",
  authMiddleware,
  upload.single("aadhaar"),
  userController.uploadAadhaar
);

router.get("/", userController.getmypocketinfo);
router.get("/:id", userController.getbyidmypocketinfo);

module.exports = router;
