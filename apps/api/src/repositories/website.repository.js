const pool = require("../config/database");

// ===============================
// Insert Website
// ===============================
const insertWebsite = async (
    userId,
    title,
    slug,
    industry,
    theme
) => {

    const [result] = await pool.query(
        `INSERT INTO websites
        (user_id, title, slug, industry, theme)
        VALUES (?, ?, ?, ?, ?)`,
        [
            userId,
            title,
            slug,
            industry,
            theme
        ]
    );

    return result;
};

// ===============================
// Find Websites By User
// ===============================
const findWebsitesByUser = async (userId) => {

    const [rows] = await pool.query(
        `SELECT
            id,
            title,
            slug,
            industry,
            theme,
            status,
            created_at
        FROM websites
        WHERE user_id = ?
        ORDER BY created_at DESC`,
        [userId]
    );

    return rows;
};

// ===============================
// Dashboard Statistics
// ===============================
const getWebsiteStats = async (userId) => {

    const [[total]] = await pool.query(
        `SELECT COUNT(*) AS total
         FROM websites
         WHERE user_id = ?`,
        [userId]
    );

    const [[published]] = await pool.query(
        `SELECT COUNT(*) AS published
         FROM websites
         WHERE user_id = ?
         AND status='published'`,
        [userId]
    );

    const [[draft]] = await pool.query(
        `SELECT COUNT(*) AS draft
         FROM websites
         WHERE user_id = ?
         AND status='draft'`,
        [userId]
    );

    return {
        total: total.total,
        published: published.published,
        draft: draft.draft
    };
};

module.exports = {
    insertWebsite,
    findWebsitesByUser,
    getWebsiteStats
};
