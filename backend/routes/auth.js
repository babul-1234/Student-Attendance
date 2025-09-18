const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    db.query('INSERT INTO shop_users (name, email, password) VALUES (?, ?, ?)', [name, email, hash],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'User registered' });
        });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM shop_users WHERE email = ?', [email], async(err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

module.exports = router;