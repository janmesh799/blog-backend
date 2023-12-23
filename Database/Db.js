// Import required module
const mongoose = require("mongoose");

// Retrieve the MongoDB URI from environment variables
const mongoUri = process.env.MONGO_URI;

// Define the ConnectToMongo function
const ConnectToMongo = async () => {
  try {
    // Set strictQuery to false to allow more flexibility in queries
    mongoose.set("strictQuery", false);

    // Connect to MongoDB using the provided URI
    await mongoose.connect(mongoUri).catch((err) => console.error(err.message));

    // Log a success message upon successful connection
    console.log("MongoDB connected");
  } catch (err) {
    // Log an error message and exit the process if connection fails
    console.error(err.message);
    process.exit(1);
  }
};

// Export the ConnectToMongo function for use in other files
module.exports = ConnectToMongo;
