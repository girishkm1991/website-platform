const pool = require("../config/database");
const { hashPassword } = require("../utils/password");

// ===============================
// Get All Users
// ===============================
const getAllUsers = async () => {

    const [rows] = await pool.query(
        "SELECT id, full_name, email, role, created_at FROM users"
    );

    return rows;
};

// ===============================
// Create User
// ===============================
const createUser = async (user) => {

    const { full_name, email, password, role } = user;

    // Hash the password before saving it
    const hashedPassword = await hashPassword(password);

    const [result] = await pool.query(
        `INSERT INTO users
        (full_name, email, password, role)
        VALUES (?, ?, ?, ?)`,
        [full_name, email, hashedPassword, role]
    );

    return result;
};

// ===============================
// Exports
// ===============================
module.exports = {
    getAllUsers,
    createUser
};
