const express = require('express')
const { body } = require('express-validator')
const CreateUser = require('./auth/CreateUser')
const LoginUser = require('./auth/LoginUser')
const LogoutUser = require('./auth/LogoutUser')

const router = express.Router()


// endpoint: /api/auth/createuser
// method: POST
// data: body({name, email, password, description})
// access: public
router.post('/createUser',
    body('email').
        isEmail().withMessage("Enter correct email format."),
    body('password')
        .isLength({ min: 8 }).withMessage("Password should be atleast 8 characters long")
        .isStrongPassword().withMessage("Try to put a strong password with one capital letter, one small letter, and one symbol"),
    body('username').
        isLength({ min: 6 }).withMessage("username should be atleast 6 characters long"),
    CreateUser
)


// endpoint: /api/auth/loginuser
// method: POST
// data: body({email, password})
// access: public
router.post('/loginuser',
    body('email').
        isEmail().withMessage("Enter correct email format."),
    LoginUser
)

// endpoint: /api/auth/logutuser
// method: GET
// data: null
// access: public
router.get('/logoutuser',
    LogoutUser
)

module.exports = router