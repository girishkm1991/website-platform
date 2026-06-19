const pool = require("../config/database");

// ===============================
// Dashboard Statistics
// ===============================
const getDashboardStats = async (userId) => {

    const [[stats]] = await pool.query(
        `
        SELECT
            COUNT(*) AS total,
            SUM(status='draft') AS draft,
            SUM(status='published') AS published
        FROM websites
        WHERE user_id = ?
        `,
        [userId]
    );

    return stats;

};

// ===============================
// Recent Websites
// ===============================
const getRecentWebsites = async (userId) => {

    const [rows] = await pool.query(
        `
        SELECT
            id,
            title,
            slug,
            status,
            created_at
        FROM websites
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 5
        `,
        [userId]
    );

    return rows;

};

module.exports = {
    getDashboardStats,
    getRecentWebsites
};
