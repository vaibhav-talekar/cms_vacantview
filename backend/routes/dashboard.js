const express = require('express');
const router = express.Router();
const db = require('../db');  // Your MySQL connection

// 1. Fetch Day from Date
router.get('/day-from-date/:date', (req, res) => {
  const date = new Date(req.params.date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[date.getDay()];
  res.json({ day });
});

// 2. Fetch Available Classes for Selected Day
router.get('/classrooms/:day', (req, res) => {
  const day = req.params.day;

  const sql = `
        SELECT DISTINCT c.class_id, c.class_name, c.floor, c.engaged
        FROM schedule s
        JOIN class c ON s.class_id = c.class_id
        WHERE s.day = ?`;

  db.query(sql, [day], (err, result) => {
    if (err) return res.status(500).json({ error: "Database Error" });
    res.json(result);
  });
});

// 3. Fetch Full Day Schedule for Selected Class
router.get('/class-schedule/:class_id/:day', (req, res) => {
  const { class_id, day } = req.params;

  const sql = `
        SELECT t.start_time, t.end_time, f.name AS faculty_name, 
               p.programme_name, sub.subject_name, c.engaged, s.engaged_flag,s.schedule_id,s.class_id ,s.other_faculty
       FROM schedule s
        JOIN timeslot t ON s.timeslot_id = t.timeslot_id
        JOIN faculty f ON s.faculty_id = f.faculty_id
        JOIN programme p ON s.programme_id = p.programme_id
        JOIN subject sub ON s.subject_id = sub.subject_id
        JOIN class c ON s.class_id = c.class_id
        WHERE s.class_id = ? AND s.day = ?
        ORDER BY t.start_time
    `;

  db.query(sql, [class_id, day], (err, result) => {
    if (err) return res.status(500).json({ error: "Database Error" });
    res.json(result);
  });
});

// 4. Fetch Faculty Details based on faculty_name
router.get('/faculty-details/:name', (req, res) => {
  const name = req.params.name;

  const sql = `SELECT faculty_id, name, email FROM faculty WHERE name = ?`;

  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json({ error: "Database Error" });
    if (result.length === 0) return res.status(404).json({ error: "Faculty Not Found" });
    res.json(result[0]);
  });
});

router.post('/cancel-slot', async (req, res) => {
  const { class_id, schedule_id } = req.body;

  try {
    await db.query(`UPDATE schedule SET engaged_flag=0 WHERE class_id=? AND schedule_id=?`, [class_id, schedule_id]);
    res.status(200).json({ message: "Class cancelled successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error cancelling class" });
  }
});

router.post('/engage-slot', async (req, res) => {
  const { class_id, schedule_id, faculty_name } = req.body;

  try {
    const query = `
      UPDATE schedule 
      SET engaged_flag = 1, other_faculty = ?
      WHERE class_id = ? AND schedule_id = ?
    `;

    await db.query(query, [faculty_name, class_id, schedule_id]);

    res.status(200).json({ message: "Slot engaged successfully!" });

  } catch (error) {
    console.log("Error engaging slot:", error);
    res.status(500).json({ error: "Error engaging slot" });
  }
});

router.post('/disengage-slot', async (req, res) => {
  const { class_id, schedule_id } = req.body;

  try {
    await db.query(`UPDATE schedule SET engaged_flag=0, other_faculty= NULL WHERE class_id=? AND schedule_id=?`, [class_id, schedule_id]);
    res.status(200).json({ message: "Class cancelled successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error cancelling class" });
  }
});

module.exports = router;
