const websiteService = require("../services/website.service");

// ===============================
// Create Website
// ===============================
const createWebsite = async (req, res) => {

    try {

        const result = await websiteService.createWebsite(
            req.user.id,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Website created successfully",
            id: result.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Get User Websites
// ===============================
const getWebsites = async (req, res) => {

    try {

        const websites = await websiteService.getUserWebsites(
            req.user.id
        );

        res.json({
            success: true,
            count: websites.length,
            websites
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createWebsite,
    getWebsites
};
