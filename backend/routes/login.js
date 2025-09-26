const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // Keep this secret

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.query('SELECT * FROM faculty WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Login Failed' });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const user = result[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ id: user.faculty_id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Login Successful', 
            token,
            name: user.name   // Send name to frontend
        });
    });
});

module.exports = router;
