// Import required module
const Blogs = require("../../Models/Blog");

// Define the getBlogById function
const getBlogById = async (req, res) => {
  let errorCode = null;
  try {
    // Getting blogId and finding the blog
    const blogId = req.header("blogId");
    const blog = await Blogs.findById(blogId);

    // If blog doesn't exist, throw an error
    if (!blog) {
      errorCode = 404;
      throw new Error("Blog not found");
    }

    // Returning the blog
    return res.status(200).json({ success: true, blog });
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

// Export the getBlogById function for use in other files
module.exports = getBlogById;
