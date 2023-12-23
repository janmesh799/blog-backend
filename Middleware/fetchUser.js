// Import required module
const jwt = require("jsonwebtoken");

// Define the fetchUser middleware function
const fetchUser = async (req, res, next) => {
  let errorCode = null;
  try {
    // Retrieve the secret key from environment variables
    const secretKey = process.env.SECRET_KEY;

    // Get the authToken from the request header
    const authToken = req.header("authToken");
    if (!authToken) {
      errorCode = 403;
      throw new Error("Authentication failed");
    }

    // Verify the authToken using the secret key
    const data = jwt.verify(authToken, secretKey);
    if (!data) {
      errorCode = 403;
      throw new Error("Authentication failed");
    }

    // Set the user data in the request object
    req.user = data;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // Checking for errors and sending them as a response
    return res
      .status(errorCode || 500)
      .json({
        success: false,
        message: "Internal server Error",
        error: err.message,
      });
  }
};

// Export the fetchUser middleware function for use in other files
module.exports = fetchUser;
