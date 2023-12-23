const User = require('../../Models/User')
const findUserByEmailorUsername = async (email, username) => {
    try {
        const user = await User.findOne({ $or: [{ email }, { username }] }).select('+password');
        if (user) {
            return { success: true, found: true, user };
        }
        return { success: true, found: false };

    } catch (err) {
        return { success: false, error: err.message };
    }
}

module.exports = findUserByEmailorUsername