const dashboardRepository = require("../repositories/dashboard.repository");

const getDashboard = async (user) => {

    const stats = await dashboardRepository.getDashboardStats(
        user.id
    );

    const recentWebsites =
        await dashboardRepository.getRecentWebsites(
            user.id
        );

    return {

        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email
        },

        stats,

        recentWebsites

    };

};

module.exports = {
    getDashboard
};
