const express = require("express");

module.exports = (db) => {
    const router = express.Router();

    // Add performance
    router.post("/add", (req, res) => {
        const { roll, subject, marks } = req.body;
        const sql = "INSERT INTO performance (roll, subject, marks) VALUES (?, ?, ?)";
        db.query(sql, [roll, subject, marks], (err, result) => {
            if (err) {
                console.error("Insert error:", err); // Log error in server
                return res.status(500).json({ error: "Database insert error" });
            }
            res.json({ message: "Performance added" });
        });
    });

    // Get performance by roll
    router.get("/:roll", (req, res) => {
        const sql = "SELECT subject, marks FROM performance WHERE roll = ?";
        db.query(sql, [req.params.roll], (err, results) => {
            if (err) return res.status(500).json({ error: "Query error" });
            res.json(results);
        });
    });

    return router;
};