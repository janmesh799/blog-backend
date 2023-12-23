// Import required modules
const express = require("express");
const { body } = require("express-validator");
const CreateUser = require("./auth/CreateUser");
const LoginUser = require("./auth/LoginUser");
const LogoutUser = require("./auth/LogoutUser");

// Create an Express Router
const router = express.Router();

// Define endpoint for creating a new user
// endpoint: /api/auth/createuser
// method: POST
// data: body({name, email, password, username, description})
// access: public
router.post(
  "/createUser",
  body(["name", "email", "password", "username", "description"])
    .notEmpty()
    .withMessage(`some fields are missing`),
  body("email").isEmail().withMessage("Enter correct email format."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .isStrongPassword()
    .withMessage(
      "Try to put a strong password with one capital letter, one small letter, and one symbol"
    ),
  body("username")
    .isLength({ min: 6 })
    .withMessage("username should be at least 6 characters long"),
  CreateUser
);

// Define endpoint for user login
// endpoint: /api/auth/loginuser
// method: POST
// data: body({email, password})
// access: public
router.post(
  "/loginuser",
  body(["email", "password"]).notEmpty().withMessage("some fields are missing"),
  body("email").isEmail().withMessage("Enter correct email format."),
  LoginUser
);

// Define endpoint for user logout
// endpoint: /api/auth/logoutuser
// method: GET
// data: null
// access: public
router.get("/logoutuser", LogoutUser);

// Export the router for use in other files
module.exports = router;
