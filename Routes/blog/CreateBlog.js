// Import required modules
const Blog = require("../../Models/Blog");
const User = require("../../Models/User");

// Define the CreateBlog function
const createBlog = async (req, res) => {
  let errorCode = null;
  try {
    // Fetch user and blog content
    const blog = req.body.blog;
    const userId = req.user.userId;
    const user = await User.findById(userId);

    // Check if user exists or not
    if (!user) {
      errorCode = 404;
      throw new Error("User not found!");
    }

    // Create a new blog
    const newBlog = new Blog(blog);
    newBlog.owner = user;
    newBlog.ownerName = user.name;

    // Save the new blog
    await newBlog
      .save()
      .then((newBlog) => {
        return res
          .status(200)
          .json({ success: true, message: "Blog Created", blog: newBlog });
      })
      .catch((err) => {
        throw new Error(`Blog creation failed due to ${err.message}`);
      });
  } catch (err) {
    // Check for errors and send them as a response
    return res.status(errorCode || 500).json({
      success: false,
      message: "Internal server Error",
      error: err.message,
    });
  }
};

// Export the CreateBlog function for use in other files
module.exports = createBlog;
