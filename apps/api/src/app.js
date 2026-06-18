const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Website Platform API Running",
        version: "0.3.0"
    });
});

app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT NOW() AS server_time");

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

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
module.exports = app;
