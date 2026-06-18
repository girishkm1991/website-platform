const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth");

const {
    createWebsite,
    getWebsites
} = require("../controllers/website.controller");

// ===============================
// Website Routes
// ===============================

router.get("/", authenticate, getWebsites);

router.post("/", authenticate, createWebsite);

module.exports = router;
