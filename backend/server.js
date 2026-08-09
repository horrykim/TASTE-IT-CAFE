const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test express server
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Taste It Cafe API is running",
    });
});


// Test Supabase PostgreeSQL connection
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        
        res.json({
               success:true,
               message: "Successfully connected to the Supabase PostgreSQL!",
                databaseTime: result.rows[0].now,
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed.",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Taste It Cafe backend running on http://localhost:${PORT}`);
});