const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'user', // or 'root@localhost' in some cases
    password: 'vt123', // empty in XAMPP by default
    database: 'faculty_db', // your database name
    port: 3000
});

db.connect((err) => {
    if (err) {
        console.log('DB Connection Error:', err);
    } else {
        console.log('MySQL Connected!');
    }
});

module.exports = db;
