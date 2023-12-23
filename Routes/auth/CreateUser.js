const User = require('../../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const findUserByEmailorUsername = require('../helper/findUserByEmailorUsername.js');
let session = require('express-session');


const SecretKey = process.env.SECRET_KEY;


const CreateUser = async (req, res, next) => {
    let errorCode = null;

    // checking for errors in body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }
    try {

        // de-structuring the credentials from request body;
        let { name, username, email, password, description } = req.body;
        email = email.toLowerCase();
        username = username.toLowerCase();

        // checking is user exists
        const isUserExists = await findUserByEmailorUsername(email = email, username = username);
        if (isUserExists.success === true && isUserExists.found === true) {
            errorCode = 409;
            throw new Error("User with same email or username already exists")
        }
        if (isUserExists.success === false) {
            errorCode = 500;
            throw new Error(isUserExists.error);
        }

        // hashing the password
        const securedPassword = bcryptjs.hashSync(password, 10);


        
        // creating and saving the user in database
        const user = new User({
            name, email, username, password: securedPassword, description
        });
        user.save().then((user) => {

            // creating the authToken
            const data = {
                userId: user.id,
                email: user.email
            }
            const authToken = jwt.sign(data, SecretKey);

            // creating and storing the session and sending the cookie
            session=req.session;
            session.email=req.body.email;
            session.authToken = authToken

            // sending created authToken and user in response
            return res.status(200).json({ success: true, message: "user created successfully", user, authToken });
        }).catch((err) => {
            throw new Error(err.message)
        })

    } catch (err) {

        // checking for erros and send them as response
        return res.status(errorCode || 500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = CreateUser;