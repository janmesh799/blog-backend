const Blogs = require("../../Models/Blog");

const editBlog = async (req, res) => {
    let errorCode = null;
    try {
        // getting details of user intitated this request
        const userId = req.user.userId;

        // de-structuring the updated blog and blogId
        const { updatedBlog, blogId } = req.body;
        const blog = await Blogs.findById(blogId);

        // checking if user has access or not
        if (blog.owner.toHexString() !== userId) {
            errorCode = 403;
            throw new Error("Access Denied!");
        }

        // updating the blog
        await Blogs.findByIdAndUpdate(blogId, updatedBlog, { new: true }).then((blog) => {
            return res.status(200).json({ success: true, message: "Blog Updated", blog });
        }).catch(err => {
            throw new Error("Blog updation failed due to ", err.message)
        })
    } catch (err) {
        // checking for erros and send them as response
        return res.status(errorCode || 500).json({ success: false, message: "Internal server Error", error: err.message })
    }
}
module.exports = editBlog;