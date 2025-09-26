const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper function for input validation
const validateBookingInput = (body) => {
  const { faculty_name, class_id, date, start_time, end_time } = body;
  if (!faculty_name || !class_id || !date || !start_time || !end_time) {
    throw new Error('Missing required fields');
  }
};

// ========================= ENGAGE Timeslot =========================
router.post('/engage', async (req, res) => {
  try {
    validateBookingInput(req.body);
    const { faculty_name, class_id, date, start_time, end_time } = req.body;

    // Check if already booked
    const [existing] = await db.query(
      `SELECT * FROM booked_class 
       WHERE class_id = ? AND date = ? 
       AND start_time = ? AND end_time = ?`,
      [class_id, date, start_time, end_time]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'This slot is already booked!' 
      });
    }

    // Insert booking
    await db.query(
      `INSERT INTO booked_class 
       (faculty_name, class_id, date, start_time, end_time) 
       VALUES (?, ?, ?, ?, ?)`,
      [faculty_name, class_id, date, start_time, end_time]
    );

    res.status(200).json({ 
      success: true,
      message: 'Timeslot engaged successfully' 
    });

  } catch (error) {
    console.error('Error engaging timeslot:', error);
    const status = error.message.includes('Missing') ? 400 : 500;
    res.status(status).json({ 
      success: false,
      message: error.message || 'Failed to engage timeslot' 
    });
  }
});

// ========================= DISENGAGE Timeslot =========================
router.delete('/disengage', async (req, res) => {
  try {
    validateBookingInput(req.body);
    const { faculty_name, class_id, date, start_time, end_time } = req.body;

    // Check if booking exists
    const [existing] = await db.query(
      `SELECT * FROM booked_class 
       WHERE class_id = ? AND date = ? 
       AND start_time = ? AND end_time = ? 
       AND faculty_name = ?`,
      [class_id, date, start_time, end_time, faculty_name]
    );

    if (existing.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No booking found to disengage!' 
      });
    }

    // Delete booking
    await db.query(
      `DELETE FROM booked_class 
       WHERE class_id = ? AND date = ? 
       AND start_time = ? AND end_time = ? 
       AND faculty_name = ?`,
      [class_id, date, start_time, end_time, faculty_name]
    );

    res.status(200).json({ 
      success: true,
      message: 'Timeslot disengaged successfully' 
    });

  } catch (error) {
    console.error('Error disengaging timeslot:', error);
    const status = error.message.includes('Missing') ? 400 : 500;
    res.status(status).json({ 
      success: false,
      message: error.message || 'Failed to disengage timeslot' 
    });
  }
});

// ========================= GET Booked Slots =========================
router.get('/booked/:class_id/:date', async (req, res) => {
  try {
    const { class_id, date } = req.params;
    
    if (!class_id || !date) {
      throw new Error('Missing class_id or date parameters');
    }

    const [results] = await db.query(
      `SELECT class_id, date, faculty_name, 
              start_time, end_time, engaged
       FROM booked_class
       WHERE class_id = ? AND date = ?
       ORDER BY start_time`,
      [class_id, date]
    );

    res.status(200).json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('Error fetching booked classes:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to fetch booked classes' 
    });
  }
});

module.exports = router;