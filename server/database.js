const sqlite3 = require('sqlite3').verbose();

// Open a connection to the database
const database = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to database');
        database.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            workoutType TEXT,
            sessionTime TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            } else {
                console.log('Users table created or already exists');
            }
        });
    }
});

module.exports = database;
