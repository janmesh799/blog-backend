// Import required modules
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User');
const { validationResult } = require('express-validator');
let session = require('express-session');
const findUserByEmailorUsername = require('../helper/findUserByEmailorUsername.js');

// Define the LoginUser function
const LoginUser = async (req, res) => {
    let errorCode = null;
    const secretKey = process.env.SECRET_KEY;

    // Checking for errors in the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        // Destructure the credentials from the request body
        let { email, password } = req.body;
        email = email.toLowerCase();

        // Check if the user exists
        const isUserExists = await findUserByEmailorUsername(email);
        if (isUserExists.success === false) {
            throw new Error(isUserExists.error);
        } else if (isUserExists.success === true && isUserExists.found == false) {
            errorCode = 404;
            throw new Error("User Not Found!");
        }
        const user = isUserExists.user;

        // Validate the password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            errorCode = 403;
            throw new Error("Please Enter Correct Credentials");
        }

        // Create authToken
        const data = {
            userId: user.id,
            email: user.email
        };
        const authToken = jwt.sign(data, secretKey);

        // Create and store the session, and send the authToken in the response
        session = req.session;
        session.email = req.body.email;
        session.authToken = authToken;

        // Send the authToken and user in the response
        return res.status(200).json({ success: true, authToken, user });

    } catch (err) {
        // Check for errors and send them as a response
        return res.status(errorCode || 500).json({ success: false, message: "Internal server Error", error: err.message });
    }
};

// Export the LoginUser function for use in other files
module.exports = LoginUser;
