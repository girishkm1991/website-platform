const express = require("express");
const cors = require("cors");

const pool = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const websiteRoutes = require("./routes/website.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json());

// ===============================
// Health Check
// ===============================
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Website Platform API Running",
        version: "0.4.0"
    });

});

// ===============================
// Database Test
// ===============================
app.get("/test-db", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT NOW() AS server_time"
        );

        res.json({
            success: true,
            database: "Connected",
            serverTime: rows[0].server_time
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

// ===============================
// API Routes
// ===============================
app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/websites", websiteRoutes);

app.use("/dashboard", dashboardRoutes);

// ===============================
module.exports = app;
