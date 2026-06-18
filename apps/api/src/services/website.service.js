const websiteRepository = require("../repositories/website.repository");

// ===============================
// Create Website
// ===============================
const createWebsite = async (userId, website) => {

    const {
        title,
        slug,
        industry,
        theme
    } = website;

    return await websiteRepository.insertWebsite(
        userId,
        title,
        slug,
        industry,
        theme
    );
};

// ===============================
// Get User Websites
// ===============================
const getUserWebsites = async (userId) => {

    return await websiteRepository.findWebsitesByUser(
        userId
    );

};

// ===============================
// Dashboard Statistics
// ===============================
const getDashboardStats = async (userId) => {

    return await websiteRepository.getWebsiteStats(
        userId
    );

};

module.exports = {
    createWebsite,
    getUserWebsites,
    getDashboardStats
};
