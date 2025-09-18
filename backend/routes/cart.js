const express = require('express');
const router = express.Router();
const db = require('../db');

// Get cart items for a user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query(
        `SELECT c.id, c.product_id, p.name, p.price, c.quantity 
     FROM shop_cart c 
     JOIN shop_products p ON c.product_id = p.id 
     WHERE c.user_id = ?`, [userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
        }
    );
});

// Add to cart
router.post('/', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    db.query(
        'INSERT INTO shop_cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?', [user_id, product_id, quantity, quantity],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Item added to cart" });
        }
    );
});

// Delete from cart
router.delete('/:id', (req, res) => {
    const cartId = req.params.id;
    db.query('DELETE FROM shop_cart WHERE id = ?', [cartId], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Item removed from cart" });
    });
});

module.exports = router;