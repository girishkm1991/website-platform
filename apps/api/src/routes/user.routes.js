const express = require("express");

const router = express.Router();
const validateUser = require("../middleware/validateUser");
const authenticate = require("../middleware/auth");
const {
    getUsers,
    createUser
} = require("../controllers/user.controller");

router.get("/", authenticate, getUsers);

router.post("/", validateUser, createUser);

module.exports = router;
