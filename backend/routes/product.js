const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM shop_products', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Get product by ID
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT * FROM shop_products WHERE id = ?', [productId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Product not found" });
        res.json(results[0]);
    });
});

module.exports = router;