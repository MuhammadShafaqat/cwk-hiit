const database = require('./database');

const createUsers = (weight, reps, description, checked, workoutType, sessionTime, callback) => {
    console.log('Creating user with weight:', weight, 'reps:', reps, 'checked:', checked, 'description:', description, 'workoutType:', workoutType, 'sessionTime:', sessionTime);

    const sql = `INSERT INTO users (weight, reps, description, checked, workoutType, sessionTime) VALUES (?, ?, ?, ?, ?, ?)`;
    database.run(sql, [weight, reps, description, checked, workoutType, sessionTime], function (err) {
        if (err) {
            console.error('Error inserting user:', err.message);
            callback(err, null);
        } else {
            console.log('User inserted successfully with ID:', this.lastID);
            callback(null, { id: this.lastID, weight, reps, description, checked, workoutType, sessionTime });
        }
    });
};

const readUsers = (callback) => {
    const sql = `SELECT id, weight, reps, description, checked, workoutType, sessionTime FROM users`;
    database.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error reading users:', err.message);
            callback(err, null);
        } else {
            // Format rows into the desired pattern
            const users = rows.map(row => ({
                id: row.id,
                weight: row.weight,
                reps: row.reps,
                description: row.description,
                checked: row.checked,
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
