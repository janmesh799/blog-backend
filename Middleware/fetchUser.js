const jwt = require("jsonwebtoken")

const fetchUser = async (req, res, next) => {
    let errorCode = null;
    try {
        const secretKey = process.env.SECRET_KEY;
        const authToken = req.header("authToken");
        if (!authToken) {
            errorCode = 403;
            throw new Error("authentication failed")
        }
        const data = jwt.verify(authToken, secretKey);
        if (!data) {
            errorCode = 403;
            throw new Error("authentication failed")
        }
        req.user = data;
        next();

    } catch (err) {
        // checking for erros and send them as response
        return res.status(errorCode || 500).json({ success: false, message: "Internal server Error", error: err.message })
    }
}

module.exports = fetchUser;