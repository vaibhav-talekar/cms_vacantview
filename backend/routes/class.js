const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/classrooms/:day', (req, res) => {
    const { day } = req.params;
    db.query(`
        SELECT c.*, s.subject, f.name AS faculty_name, cr.course_name, t.start_time, t.end_time
        FROM class c
        LEFT JOIN schedule s ON c.class_id = s.class_id AND s.day = ?
        LEFT JOIN faculty f ON s.faculty_id = f.faculty_id
        LEFT JOIN course cr ON s.course_id = cr.course_id
        LEFT JOIN timeslot t ON s.timeslot_id = t.timeslot_id
        WHERE c.floor = 1
    `, [day], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

router.post('/engage', (req, res) => {
    const { class_id, status } = req.body;
    db.query('UPDATE class SET engaged = ? WHERE class_id = ?', [status, class_id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Class status updated!' });
    });
});

module.exports = router;
