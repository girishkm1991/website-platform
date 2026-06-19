const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {

    try {

        const dashboard =
            await dashboardService.getDashboard(
                req.user
            );

        res.json({

            success: true,

            ...dashboard

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
    getDashboard
};
