// Import required modules
const User = require("../../Models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const findUserByEmailorUsername = require("../helper/findUserByEmailorUsername.js");
let session = require("express-session");

// Retrieve the secret key from environment variables
const SecretKey = process.env.SECRET_KEY;

// Define the CreateUser function as an asynchronous middleware
const CreateUser = async (req, res, next) => {
  let errorCode = null;

  // Checking for errors in the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    // Destructure the credentials from the request body
    let { name, username, email, password, description } = req.body;
    email = email.toLowerCase();
    username = username.toLowerCase();

    // Check if the user already exists
    const isUserExists = await findUserByEmailorUsername(email, username);
    if (isUserExists.success === true && isUserExists.found === true) {
      errorCode = 409;
      throw new Error("User with the same email or username already exists");
    }
    if (isUserExists.success === false) {
      errorCode = 500;
      throw new Error(isUserExists.error);
    }

    // Hash the password
    const securedPassword = bcryptjs.hashSync(password, 10);

    // Create and save the user in the database
    const user = new User({
      name,
      email,
      username,
      password: securedPassword,
      description,
    });
    user
      .save()
      .then((user) => {
        // Create the authToken
        const data = {
          userId: user.id,
          email: user.email,
        };
        const authToken = jwt.sign(data, SecretKey);

        // Create and store the session and send the cookie
        session = req.session;
        session.email = req.body.email;
        session.authToken = authToken;

        // Send the created authToken and user in the response
        return res
          .status(200)
          .json({
            success: true,
            message: "User created successfully",
            user,
            authToken,
          });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    // Check for errors and send them as a response
    return res
      .status(errorCode || 500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
  }
};

// Export the CreateUser function for use in other files
module.exports = CreateUser;
