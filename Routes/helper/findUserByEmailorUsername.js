// Import required module
const User = require("../../Models/User");

// Define the findUserByEmailorUsername function
const findUserByEmailorUsername = async (email, username) => {
  try {
    // Find a user by email or username
    const user = await User.findOne({ $or: [{ email }, { username }] }).select(
      "+password"
    );

    // If user exists, return success, found, and user details
    if (user) {
      return { success: true, found: true, user };
    }

    // If user does not exist, return success and not found
    return { success: true, found: false };
  } catch (err) {
    // If an error occurs, return failure and error details
    return { success: false, error: err.message };
  }
};

// Export the findUserByEmailorUsername function for use in other files
module.exports = findUserByEmailorUsername;
