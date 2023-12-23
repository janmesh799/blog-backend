
const Blog = require('../../Models/Blog');
const User = require('../../Models/User');
const CreateBlog = async (req, res) => {ex
    let errorCode = null;
    try {
        // fetching user and blog content
        const blog = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);

        // checking if user exists or not
        if (!user) {
            errorCode = 404;
            throw new Error("User not found!");
        }

        // crete new Blog
        const newBlog = new Blog(blog);
        newBlog.owner = user;
        newBlog.ownerName = user.name;

        // saving new blog
        await newBlog.save().then(newBlog => {
            return res.status(200).json({ success: true, message: "Blog Created", blog: newBlog })
        }).catch(err => {
            throw new Error("blog creation failed.")
        })
    } catch (err) {
        // checking for erros and send them as response
        return res.status(errorCode || 500).json({ success: false, message: "Internal server Error", error: err.message })
    }

}
module.exports = CreateBlog;