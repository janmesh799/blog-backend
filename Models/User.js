// Import required module
const mongoose = require("mongoose");

// Define the User schema
const UserSchema = mongoose.Schema(
  {
    // User's name, required field
    name: {
      type: String,
      required: true,
    },
    // User's email, required field
    email: {
      type: String,
      required: true,
    },
    // User's username, required field
    username: {
      type: String,
      required: true,
    },
    // User's password, required and hidden from select queries
    password: {
      type: String,
      required: true,
      select: false,
    },
    // User's description, optional field
    description: {
      type: String,
      required: false,
    },
  },
  {
    // Define timestamps for created and updated at fields
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

// Export the User model based on the defined schema
module.exports = User = mongoose.model("User", UserSchema);
