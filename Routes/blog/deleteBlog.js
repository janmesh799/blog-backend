// Import required module
const Blogs = require("../../Models/Blog");

// Define the deleteBlog function
const deleteBlog = async (req, res) => {
    let errorCode = null;
    try {
        // Getting details of the user who initiated this request
        const userId = req.user.userId;

        // Getting blogId and finding that blog
        const blogId = req.header("blogId");
        const blog = await Blogs.findById(blogId);
        if (!blog) {
            errorCode = 404;
            throw new Error("Blog not found");
        }

        // Authenticating if the user has access or not
        if (blog.owner.toHexString() !== userId) {
            errorCode = 403;
            throw new Error("Access Denied");
        }

        // Deleting the blog
        await Blogs.findByIdAndDelete(blogId).then(() => {
            return res.status(200).json({ success: true, message: "Blog Deleted Successfully." });
        }).catch(err => {
            throw new Error("Blog deletion failed due to " + err.message);
        });
    }
    catch (err) {
        // Checking for errors and sending them as a response
        return res.status(errorCode || 500).json({ success: false, message: "Internal server Error", error: err.message });
    }
};

// Export the deleteBlog function for use in other files
module.exports = deleteBlog;
