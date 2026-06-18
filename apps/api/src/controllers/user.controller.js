const userService = require("../services/user.service");

const getUsers = async (req, res) => {

    try {

        const users = await userService.getAllUsers();

        res.json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const createUser = async (req, res) => {

    try {

        const result = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully",
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

module.exports = {
    getUsers,
    createUser
};
