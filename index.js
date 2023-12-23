// Load environment variables from a .env file if available
require("dotenv").config();

// Import required modules
const express = require("express");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const ConnectToMongo = require("./Database/Db");

// Create an Express application
const app = express();

// Configure rate limiting for the application
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

// Apply rate limiting middleware
app.use(limiter);

// Parse JSON requests
app.use(express.json());

// Configure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "random word",
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }, // oneDay
    resave: true,
  })
);

// Set the port for the application
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
ConnectToMongo();

// Define a route for the home page
app.get("/", (req, res) => {
  res.send("home");
});

// Define routes for authentication and blog-related endpoints
app.use("/api/auth", require("./Routes/Auth"));
app.use("/api/blog", require("./Routes/Blog"));

// Start the server
app.listen(PORT, () => {
  console.log("backend app is running on http://localhost:5000");
});
