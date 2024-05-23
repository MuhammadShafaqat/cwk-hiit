const database = require('./database');

const createUsers = (description, workoutType, sessionTime, callback) => {
    console.log('Creating user with description:', description, 'workoutType:', workoutType, 'sessionTime:', sessionTime);

    const sql = `INSERT INTO users (description, workoutType, sessionTime) VALUES (?, ?, ?)`;
    database.run(sql, [description, workoutType, sessionTime], function (err) {
        if (err) {
            console.error('Error inserting user:', err.message);
            callback(err, null);
        } else {
            console.log('User inserted successfully with ID:', this.lastID);
            callback(null, { id: this.lastID, description, workoutType, sessionTime });
        }
    });
};

const readUsers = (callback) => {
    const sql = `SELECT id, description, workoutType, sessionTime FROM users`;
    database.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error reading users:', err.message);
            callback(err, null);
        } else {
            const users = rows.map(row => ({
                id: row.id,
                description: row.description,
                workoutType: row.workoutType,
                sessionTime: row.sessionTime
            }));
            callback(null, users);
        }
    });
};

const deleteUser = (userId, callback) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    database.run(sql, userId, function (err) {
        if (err) {
            console.error('Error deleting user:', err.message);
            callback(err);
        } else {
            console.log('User deleted successfully');
            callback(null);
        }
    });
};

module.exports = { createUsers, readUsers, deleteUser };
