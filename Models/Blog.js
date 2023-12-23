// Import required module
const mongoose = require("mongoose");

// Define the Blog schema
const BlogSchema = mongoose.Schema(
  {
    // Title of the blog, required field
    title: {
      type: String,
      required: true,
    },
    // Description of the blog
    description: {
      type: String,
    },
    // Tags associated with the blog, stored as an array of strings
    tags: [
      {
        type: String,
      },
    ],
    // Owner's name, required field
    ownerName: {
      type: String,
      required: true,
    },
    // Owner's ID, referencing the 'users' collection
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    // Define timestamps for created and updated at fields
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Export the Blog model based on the defined schema
module.exports = Blog = mongoose.model("Blog", BlogSchema);
