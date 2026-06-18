const pool = require("../config/database");
const { comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

const login = async (email, password) => {

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (rows.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = rows[0];

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    login
};
