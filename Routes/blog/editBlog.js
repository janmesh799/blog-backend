// Import required module
const Blogs = require("../../Models/Blog");

// Define the editBlog function
const editBlog = async (req, res) => {
  let errorCode = null;
  try {
    // Getting details of the user who initiated this request
    const userId = req.user.userId;

    // Destructuring the updated blog and blogId
    let { updatedBlog, blogId } = req.body;
    const blog = await Blogs.findById(blogId);
    if (!blog) {
      errorCode = 404;
      throw new Error("Blog not found");
    }

    // Checking if the user has access or not
    if (blog.owner.toHexString() !== userId) {
      errorCode = 403;
      throw new Error("Access Denied!");
    }

    // Updating the blog
    await Blogs.findByIdAndUpdate(blogId, updatedBlog, { new: true })
      .then((blog) => {
        return res
          .status(200)
          .json({ success: true, message: "Blog Updated", blog });
      })
      .catch((err) => {
        throw new Error("Blog updation failed due to " + err.message);
      });
  } catch (err) {
    // Checking for errors and sending them as a response
    return res.status(errorCode || 500).json({
      success: false,
      message: "Internal server Error",
      error: err.message,
    });
  }
};

// Export the editBlog function for use in other files
module.exports = editBlog;
