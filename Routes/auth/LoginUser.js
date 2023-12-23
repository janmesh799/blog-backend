const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../Models/User');
const { validationResult } = require('express-validator')
let session = require('express-session');
const findUserByEmailorUsername = require('../helper/findUserByEmailorUsername.js');

const LoginUser = async (req, res) => {
    let errorCode = null;
    const secretKey = process.env.SECRET_KEY;

    // checking for erros in body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {
        // de-structuring the credentials from request body
        let { email, password } = req.body;
        email = email.toLowerCase();

        // checking if user exists or not
        const isUserExists = await findUserByEmailorUsername(email = email);
        if (isUserExists.success === false) {
            throw new Error(isUserExists.error);
        }
        else if (isUserExists.success === true && isUserExists.found == false) {
            errorCode = 404;
            throw new Error("User Not Found!")
        }
        const user = isUserExists.user;

        // validating password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            errorCode = 403
            throw new Error("Please Enter Correct Credentials")
        }

        // creating authToken
        const data = {
            userId: user.id,
            email: user.email
        }
        const authToken = jwt.sign(data, secretKey);
            session=req.session;
            session.email=req.body.email;
            session.authToken = authToken
        // sending authToken and user in response
        return res.status(200).json({ success: true, authToken, user });

    } catch (err) {

        // checking for erros and send them as response
        return res.status(errorCode || 500).json({ success: false, message: "Internal server Error", error: err.message })
    }
}

module.exports = LoginUser;