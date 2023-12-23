const express = require('express')
const CreateBlog = require('./blog/CreateBlog.js');
const fetchUser = require('../Middleware/fetchUser');
const editBlog = require('./blog/editBlog');
const deleteBlog = require('./blog/deleteBlog');
const getBlogById = require('./blog/getBlogById');

const router = express.Router()

// endpoint: /api/blog/createblog
// method: POST
// data: body({title, description, tags}) and headers({authToken})
// access: loggedin user
router.post("/createblog", fetchUser, CreateBlog);

// endpoint: /api/blog/getBlogById
// method: GET
// data:  headers({authToken, blogId})
// access: loggedin user
router.get('/getBlogById', fetchUser, getBlogById)

// endpoint: /api/blog/editblog
// method: PUT
// data: body({title, description, tags}) and headers({authToken})
// access: owner of blog
router.put('/editblog', fetchUser, editBlog);

// endpoint: /api/blog/deleteblog
// method: delete
// data:  headers({authToken, blogId})
// access: owner of blog
router.delete('/deleteblog', fetchUser, deleteBlog)

module.exports = router