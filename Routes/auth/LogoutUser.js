// Define the LogoutUser function
const LogoutUser = (req, res) => {
    try {
        // Deleting the session data
        req.session.destroy();

        // Send a success message in the response
        res.status(200).json({ success: true, message: "Successfully logged out" });
    } catch (err) {
        // Check for errors and send them as a response
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
};

// Export the LogoutUser function for use in other files
module.exports = LogoutUser;
