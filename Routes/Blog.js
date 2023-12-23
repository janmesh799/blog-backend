// Import required modules
const express = require("express");
const CreateBlog = require("./blog/CreateBlog.js");
const fetchUser = require("../Middleware/fetchUser");
const editBlog = require("./blog/editBlog");
const deleteBlog = require("./blog/deleteBlog");
const getBlogById = require("./blog/getBlogById");

// Create an Express Router
const router = express.Router();

// Define endpoint for creating a new blog
// endpoint: /api/blog/createblog
// method: POST
// data: body({title, description, tags}) and headers({authToken})
// access: logged-in user
router.post("/createblog", fetchUser, CreateBlog);

// Define endpoint for getting a blog by its ID
// endpoint: /api/blog/getBlogById
// method: GET
// data: headers({authToken, blogId})
// access: logged-in user
router.get("/getBlogById", getBlogById);

// Define endpoint for editing a blog
// endpoint: /api/blog/editblog
// method: PUT
// data: body({title, description, tags}) and headers({authToken})
// access: owner of the blog
router.put("/editblog", fetchUser, editBlog);

// Define endpoint for deleting a blog
// endpoint: /api/blog/deleteblog
// method: DELETE
// data: headers({authToken, blogId})
// access: owner of the blog
router.delete("/deleteblog", fetchUser, deleteBlog);

// Export the router for use in other files
module.exports = router;
