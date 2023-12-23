const Blogs = require("../../Models/Blog");

const deleteBlog = async (req, res) => {
    let errorCode = null;
    try {
        // getting details of user intitated this request
        const userId = req.user.userId;
        
        // getting blogId and finding that blog
        const blogId = req.header("blogId");
        const blog = await Blogs.findById(blogId);
        if (!blog) {
            errorCode = 404;
            throw new Error("Blog not found")
        }

        // authenticating if user have access or not
        if (blog.owner.toHexString() !== userId) {
            errorCode = 403;
            throw new Error("Access Denied")
        }

        // deleting the blog
        await Blogs.findByIdAndDelete(blogId).then((blog) => {
            return res.status(200).json({ success: false, message: "Blog Deleted Successfully." })
        }).catch(err => {
            throw new Error("Blog deletion failed due to " + err.message)

        })
    }
    catch (err) {
        // checking for erros and send them as response
        return res.status(errorCode || 500).json({ success: false, message: "Internal server Error", error: err.message })
    }
}
module.exports = deleteBlog;