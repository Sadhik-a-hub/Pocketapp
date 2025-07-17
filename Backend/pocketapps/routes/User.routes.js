// In routes/user.routes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const upload = require("../middleware/multerConfig"); 
const authMiddleware = require("../middleware/authMiddleware"); 

const userController = require("../controller/user.controller");
const todosController = require("../controller/todotask.controller");



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
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("At least one uppercase letter required")
    .matches(/[a-z]/)
    .withMessage("At least one lowercase letter required")
    .matches(/[0-9]/)
    .withMessage("At least one number required")
    .matches(/[@$!%*?&]/)
    .withMessage("At least one special character required"),
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

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "You accessed protected data!",
      user: req.user, 
    });
  }
);

router.post(
  "/upload-aadhaar",
  authMiddleware,
  upload.single("aadhaar"),
  userController.uploadAadhaar
);


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


router.post("/create", authMiddleware, todosController.createTask);


router.get("/", userController.getmypocketinfo);

router.get("/:id", userController.getbyidmypocketinfo);


router.get("/secure-data", authMiddleware, (req, res) => {
  res.json({ message: "Secure access granted", user: req.user });
});

module.exports = router;
