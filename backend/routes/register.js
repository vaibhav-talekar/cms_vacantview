const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
    const { faculty_id, name, email, password } = req.body;

    if (!faculty_id || !name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO faculty (faculty_id, name, email, password) VALUES (?, ?, ?, ?)',
        [faculty_id, name, email, hashedPassword],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Registration Failed' });
            }
            res.status(200).json({ message: 'Registration Successful' });
        }
    );
});

module.exports = router;
