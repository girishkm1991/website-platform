const pool = require("../config/database");

const getAllUsers = async () => {

    const [rows] = await pool.query(
        "SELECT id, full_name, email, role, created_at FROM users"
    );

    return rows;
};

const createUser = async (user) => {

    const { full_name, email, password, role } = user;

    const [result] = await pool.query(
        `INSERT INTO users
        (full_name, email, password, role)
        VALUES (?, ?, ?, ?)`,
        [full_name, email, password, role]
    );

    return result;
};

module.exports = {
    getAllUsers,
    createUser
};
