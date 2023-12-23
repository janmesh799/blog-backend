const LogoutUser = (req, res) => {
    try {

        // deleting the session data
        req.session.destroy();
        res.status(200).json({ success: true, message: "Successfully logged out" });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = LogoutUser 